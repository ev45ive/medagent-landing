"use server";
import { redirect } from "next/navigation";
import { activecampaignContactAdd } from "./activecampaignContactAdd";
import { SMSAPIClient } from "./sendSMS";
import { activeCampaignAPI, Contact } from "./activeCampaign";
import { checkBotId } from "botid/server";

const NOTIFICATION_SMS_TO = "48603438638";
const LIST_ID = "4";

const smsClient = new SMSAPIClient("OC Lekarza");

export async function addContact(form: FormData) {
  try {
    const verification = await checkBotId();
    const token = form.get("cf-turnstile-response");
    console.log("CF_TOKEN", token);

    if (verification.isBot || !token) {
      throw new Error("Access denied");
    }

    let notification_message = [
      "Medagent:",
      form.get("phone"),
      form.get("email"),
      form.get("message"),
    ].join(" ");

    const confirmation =
      "Dziękuję za kontakt. Oddzwonie najszybciej jak bedę mogł.";

    await Promise.allSettled([
      smsClient.send(NOTIFICATION_SMS_TO, notification_message),
      email(form),
    ]);

    // Notify client
    const clientPhone = form.get("phone")?.toString() ?? "";
    const cleanedPhone = clientPhone
      .replace(/[^\d]/g, "") // non digit
      .replace(/^0+/g, ""); // leading 0s
    const normalizedPhone = cleanedPhone.startsWith("48")
      ? cleanedPhone
      : `48${cleanedPhone}`;
    const data = smsClient.send(normalizedPhone, confirmation);

    console.error("SMS API data:", await data);
  } catch (error: any) {
    console.error("SMS API error:", error);
  } finally {
    redirect("/thankyou");
  }
}

async function email(form: FormData) {
  const json = {
    contact: {
      email: form.get("email"),
      phone: form.get("phone"),
      fieldValues: [
        {
          field: "1",
          value: form.get("message") || "",
        },
      ],
    },
  };

  const contactRes = await activeCampaignAPI
    .post<{ contact: Contact }>("contacts", {
      json,
    })
    .json();

  const contactId = contactRes?.contact?.id;

  if (contactId) {
    await activeCampaignAPI.post("contactLists", {
      json: {
        contactList: {
          list: LIST_ID,
          contact: contactId,
          status: 1,
        },
      },
    });
  }
}
