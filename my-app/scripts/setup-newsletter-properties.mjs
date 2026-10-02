import { Resend } from "resend";
// Metadata only: no contacts are enrolled and no emails/events are sent.
if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is required");
const resend = new Resend(process.env.RESEND_API_KEY);
const existing = await resend.contactProperties.list({ limit: 100 });
if (existing.error)
  throw new Error(`Cannot read contact properties: ${existing.error.name}`);
if (existing.data.has_more)
  throw new Error("More than 100 properties: inspect before proceeding");
for (const property of [
  { key: "gender", type: "string", fallbackValue: "" },
  { key: "salutation", type: "string", fallbackValue: "Reader" },
  { key: "keltner_welcome_queued", type: "string", fallbackValue: "no" },
]) {
  const found = existing.data.data.find((item) => item.key === property.key);
  if (found) {
    if (found.type !== property.type)
      throw new Error(`Wrong type for ${property.key}`);
    console.log(`Already exists: ${property.key}`);
  } else {
    const result = await resend.contactProperties.create(property);
    if (result.error)
      throw new Error(`Cannot create ${property.key}: ${result.error.name}`);
    console.log(`Created: ${property.key}`);
  }
}
