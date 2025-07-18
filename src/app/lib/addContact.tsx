"use server";
import { redirect } from "next/navigation";
import { activecampaignContactAdd } from "./activecampaignContactAdd";
import { sendSMS } from "./sendSMS";


export async function addContact(form: FormData) {
  try {
    await sendSMS(
      `Medagent - Kontakt - ${form
        .get("email")
        ?.toString()
        .replace(".", " . ")} - ${
        form.get("phone") //
      } - ${
        form.get("message") //
      }`
    );

    await activecampaignContactAdd(form);
  } catch (e) {
    console.error(e);
  }
  redirect("/thankyou");
}
