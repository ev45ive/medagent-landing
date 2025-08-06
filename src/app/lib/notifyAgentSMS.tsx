import { smsClient } from "./smsClient";

// TODO: Env vars:
export const NOTIFICATION_SMS_TO = "48603438638";

export async function notifyAgentSMS(
  message: (string | null | File)[],
  smsTo = NOTIFICATION_SMS_TO
) {
  try {
    const res = await smsClient.send(
      smsTo,
      message.filter((s) => typeof s == "string" && s.trim() !== "").join(" ")
    );

    console.log("notifyAgentSMS:", res);

    return res;
  } catch (e) {
    console.error("notifyAgentSMS Error", e);
  }
}
