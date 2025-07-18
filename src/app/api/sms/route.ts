import { SMSAPIClient } from "@/app/lib/sendSMS";
import ky from "ky";

const NOTIFICATION_SMS_TO = "48603438638";

export async function GET(request: Request) {
  try {
    const form = new FormData();

    const random = "pierdola ";
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
