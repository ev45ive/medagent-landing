import { smsClient } from "./smsClient";

export async function notifyClientSMS(
  form: FormData,
  confirmation = "Dziękuję za kontakt. Oddzwonie najszybciej jak bedę mogł."
) {
  try {
    const normalizedPhone = normalizePhoneNumber(form);

    const data = await smsClient.send(normalizedPhone, confirmation);

    console.log("notifyClientSMS:", data);

    return data;
  } catch (e) {
    console.error("notifyClientSMS Error", e);
  }
}

function normalizePhoneNumber(form: FormData) {
  const clientPhone = form.get("phone")?.toString() ?? "";
  const cleanedPhone = clientPhone // TODO: Test
    .replace(/[^\d]/g, "") // non digit
    .replace(/^0+/g, ""); // leading 0s

  const normalizedPhone = cleanedPhone.startsWith("48")
    ? cleanedPhone
    : `48${cleanedPhone}`;

  return normalizedPhone;
}
