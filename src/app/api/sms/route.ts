import ky from "ky";

const NOTIFICATION_SMS_TO = "48603438638";

export async function GET(request: Request) {
  try {
    const form = new FormData();

    const random = "pierdola 123";
    form.set("email", `banana+${random}@banana.com`);
    form.set("phone", "+48506619044");
    form.set("message", "wiadomosc " + random);

    let notification_message = [
      "Medagent:",
      form.get("phone"),
      form.get("email"),
      form.get("message"),
    ].join(" ");

    let data = await new SMSAPIClient("OC Lekarza").send(
      NOTIFICATION_SMS_TO,
      notification_message
    );

    const confirmation =
      "Dziękuję za kontakt. Oddzwonie najszybciej jak bedę mogł.";

    await new SMSAPIClient("OC Lekarza").send(
      "" + form.get("phone"),
      confirmation
    );

    return Response.json(data);
  } catch (error: any) {
    console.error("SMS API error:", error);
    return Response.json(
      { error: error?.message ?? "Failed to send SMS" },
      { status: 500 }
    );
  }
}

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

class SMSAPIClient {
  constructor(private from: string) {}

  async send(to: string, message: string) {
    message = message.slice(0, MAX_SMS_LENGTH);

    const payload = {
      from: this.from,
      to,
      message,
      format: "json",
      encoding: "utf-8",
    };

    const res = await SMSAPI.get("sms.do", {
      searchParams: payload,
    });

    const data = res.json();

    console.log("Wysyłka SMS: ", data);

    return await data;
  }
}
