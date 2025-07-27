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

export class SMSAPIClient {
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

    const data = await res.json();

    console.log("Wysyłka SMS: ", data);

    return await data;
  }
}
