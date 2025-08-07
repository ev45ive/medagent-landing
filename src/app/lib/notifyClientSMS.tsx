import { HTTPError } from "ky";
import { smsClient } from "./smsClient";

export async function notifyClientSMS(
  form: Record<"email" | "phone" | "message", string>,
  confirmation = ["Dziękuję za kontakt. Oddzwonie najszybciej jak bedę mogł."]
) {
  try {
    const clientPhone = form.phone?.toString() ?? "";
    const normalizedPhone = normalizePhoneNumber(clientPhone);

    const data = await smsClient.send(normalizedPhone, confirmation.join(''));

    console.log("notifyClientSMS:", data);

    return data;
  } catch (e) {
    if (e instanceof HTTPError)
      console.error("notifyClientSMS Error", await e.response.text());
    console.error("notifyClientSMS Error", e);
  }
}

function normalizePhoneNumber(clientPhone: string) {
  const cleanedPhone = clientPhone // TODO: Test
    .replace(/[^\d]/g, "") // non digit
    .replace(/^0+/g, ""); // leading 0s

  const normalizedPhone = cleanedPhone.startsWith("48")
    ? cleanedPhone
    : `48${cleanedPhone}`;

  return normalizedPhone;
}
