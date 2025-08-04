import { smsClient } from "./smsClient";

// TODO: Env vars:
export const NOTIFICATION_SMS_TO = "48603438638";

export async function notifyAgentSMS(form: FormData) {
  try {
    const message = [
      "Medagent:",
      form.get("phone"),
      form.get("email"),
      form.get("message"),
    ].join(" ");

    const res = await smsClient.send(NOTIFICATION_SMS_TO, message);
    
    console.log("notifyAgentSMS:", res);

    return res;
  } catch (e) {
    console.error("notifyAgentSMS Error", e);
  }
}
