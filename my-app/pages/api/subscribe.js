import { createSubscribeHandler } from '../../src/server/subscribe.mjs';

// Parse a bounded body ourselves so invalid JSON/oversized input also gets JSON errors.
export const config = { api: { bodyParser: false }, maxDuration: 30 };
export default createSubscribeHandler();
