import ky from "ky";

const SMSAPI = ky.create({
  headers: {
    // https://ssl.smsapi.pl/react/oauth/manage
    Authorization: `Bearer ${process.env["SMSAPI_TOKEN"]}`,
  },
  prefixUrl: "https://api.smsapi.pl/",
});
const MAX_SMS_LENGTH = 159;

// DOCS:
// https://ssl.smsapi.pl/react/oauth/manage
// https://ssl.smsapi.pl/react/sms_settings/sendernames
// https://www.smsapi.pl/docs#20-alfabet-7bit-gsm
// https://www.smsapi.pl/docs/?#2-pojedynczy-sms

export async function GET(request: Request) {
  try {
    const form = new FormData();

    const random = "pierdola";
    form.set("email", `banana+${random}@banana.com`);
    form.set("phone", "+48" + random);
    form.set("message", "wiadomosc " + random);

    const confirmation =
      "Dziękuję za kontakt. Oddzwonie najszybciej jak bedę mogł.";

    let message = [
      "Medagent:",
      form.get("phone"),
      form.get("email"),
      form.get("message"),
    ].join(" ");

    let data = await SMSAPI_send({
      message,
      from: "OC Lekarza",
      to: "48603438638",
    });

    console.log("Wysyłka SMS: ", data);

    return Response.json(data);
  } catch (error: any) {
    console.error("SMS API error:", error);
    return Response.json(
      { error: error?.message ?? "Failed to send SMS" },
      { status: 500 }
    );
  }
}
async function SMSAPI_send({
  from,
  message,
  to,
}: {
  message: string;
  from: string;
  to: string;
}) {
  message = message.slice(0, MAX_SMS_LENGTH);

  const payload = { from, to, message, format: "json", encoding: "utf-8" };

  const res = await SMSAPI.get("sms.do", {
    searchParams: payload,
  });

  return await res.json();
}
