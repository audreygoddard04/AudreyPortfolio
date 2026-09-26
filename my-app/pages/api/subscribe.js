import { Resend } from "resend";

export const config = { api: { bodyParser: { sizeLimit: "2kb" } } };

// Dependencies are injectable so API behavior can be checked without enrolling anyone.
export function createSubscribeHandler({
  env = process.env,
  createContact,
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
    if (firstName.length > 80)
      return res
        .status(400)
        .json({ error: "Please use a first name under 80 characters." });
    if (!env.RESEND_API_KEY || !env.RESEND_KELTNER_SEGMENT_ID) {
      return res.status(503).json({
        error:
          "Newsletter signup is not available just yet. Please check back soon.",
      });
    }
    try {
      const contact = {
        email,
        ...(firstName ? { firstName } : {}),
        unsubscribed: false,
        segments: [{ id: env.RESEND_KELTNER_SEGMENT_ID }],
      };
      const result = createContact
        ? await createContact(contact)
        : await new Resend(env.RESEND_API_KEY).contacts.create(contact);
      if (result.error || !result.data?.id) {
        return res.status(502).json({
          error: "We couldn’t subscribe you. Please try again shortly.",
        });
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
