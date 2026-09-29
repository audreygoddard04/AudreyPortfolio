import { Resend } from "resend";

export const config = { api: { bodyParser: { sizeLimit: "2kb" } } };

// Dependencies are injectable so API behavior can be checked without enrolling anyone.
export function createSubscribeHandler({
  env = process.env,
  createContact,
  getContact,
  listContactSegments,
  queueWelcome,
  updateContact,
} = {}) {
  return async function subscribe(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed." });
    }
    if (!req.headers["content-type"]?.startsWith("application/json")) {
      return res
        .status(415)
        .json({ error: "Please submit the subscription form." });
    }
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address." });
    }
    const firstName =
      typeof req.body?.firstName === "string" ? req.body.firstName.trim() : "";
    const lastName =
      typeof req.body?.lastName === "string" ? req.body.lastName.trim() : "";
    const gender = req.body?.gender;
    // Preserve international names, but exclude markup and control characters.
    const validName = (name) =>
      name.length > 0 && name.length <= 80 && !/[<>\p{Cc}]/u.test(name);
    if (!validName(firstName) || !validName(lastName))
      return res.status(400).json({
        error:
          "Please enter your first and last names (up to 80 characters each).",
      });
    if (gender !== "male" && gender !== "female")
      return res.status(400).json({ error: "Please select Male or Female." });
    const salutation = `${gender === "male" ? "Mr." : "Ms."} ${lastName}`;
    if (!env.RESEND_API_KEY || !env.RESEND_KELTNER_SEGMENT_ID) {
      return res.status(503).json({
        error:
          "Newsletter signup is not available just yet. Please check back soon.",
      });
    }
    try {
      const resend = new Resend(env.RESEND_API_KEY);
      const existing = await (
        getContact || ((email) => resend.contacts.get({ email }))
      )(email);
      if (existing.error && existing.error.name !== "not_found") {
        throw new Error("Contact lookup failed");
      }
      // Preserve an existing opt-out; a public form must not silently undo it.
      if (existing.data?.unsubscribed) {
        return res.status(409).json({
          error:
            "This address has unsubscribed. Please contact Audrey to rejoin.",
        });
      }
      // A contact may belong to another list, so check KELTNER membership.
      // A historical welcome event is not proof of current membership.
      let alreadySubscribed = false;
      if (existing.data?.id) {
        let after;
        do {
          const segments = await (
            listContactSegments ||
            ((options) => resend.contacts.segments.list(options))
          )({
            contactId: existing.data.id,
            limit: 100,
            ...(after ? { after } : {}),
          });
          if (segments.error || !segments.data)
            throw new Error("Membership lookup failed");
          alreadySubscribed = segments.data.data.some(
            (segment) => segment.id === env.RESEND_KELTNER_SEGMENT_ID,
          );
          if (alreadySubscribed || !segments.data.has_more) break;
          const next = segments.data.data.at(-1)?.id;
          if (!next || next === after)
            throw new Error("Membership pagination failed");
          after = next;
        } while (after);
      }
      if (alreadySubscribed) {
        // Do not overwrite their profile or queue a second welcome.
        return res.status(200).json({ success: true, alreadySubscribed: true });
      }
      const contact = {
        email,
        firstName,
        lastName,
        properties: { gender, salutation },
        unsubscribed: false,
        segments: [{ id: env.RESEND_KELTNER_SEGMENT_ID }],
      };
      // Existing contacts need their new profile saved before a welcome event.
      if (existing.data?.id) {
        const updated = await (
          updateContact || ((payload) => resend.contacts.update(payload))
        )({
          id: existing.data.id,
          firstName,
          lastName,
          properties: { gender, salutation },
        });
        if (updated.error || !updated.data)
          throw new Error("Contact profile could not be saved");
      }
      const result = createContact
        ? await createContact(contact)
        : await resend.contacts.create(contact);
      if (result.error || !result.data?.id) {
        return res.status(502).json({
          error: "We couldn’t subscribe you. Please try again shortly.",
        });
      }
      if (existing.data?.properties?.keltner_welcome_queued?.value !== "yes") {
        const welcome = await (
          queueWelcome || ((payload) => resend.events.send(payload))
        )({
          event: "keltner.subscribed",
          contactId: result.data.id,
        });
        if (welcome.error || !welcome.data)
          throw new Error("Welcome could not be queued");
        // Resend owns delivery/retries. Store the accepted event on the contact so
        // later signups do not trigger another welcome, even after a server restart.
        const marked = await (
          updateContact || ((payload) => resend.contacts.update(payload))
        )({
          id: result.data.id,
          properties: { keltner_welcome_queued: "yes" },
        });
        if (marked.error || !marked.data)
          throw new Error("Welcome status could not be saved");
      }
      return res.status(200).json({ success: true });
    } catch {
      return res.status(502).json({
        error:
          "We couldn’t connect to the mailing list. Please try again shortly.",
      });
    }
  };
}

export default createSubscribeHandler();
