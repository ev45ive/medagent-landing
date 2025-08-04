import assert from "assert";
import { checkBotId } from "botid/server";

export async function ensureHumanAccess(form: FormData) {
  const { isBot } = await checkBotId();
  console.log("BotId", isBot);

  const cfToken = form.get("cf-turnstile-response");
  console.log("CF_TOKEN", cfToken);

  assert.ok(isBot == false, "Access Denied: isBot");
  assert.ok(cfToken, "Access Denied: cfToken");
}
