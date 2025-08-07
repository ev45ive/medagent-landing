"use server";

import { redirect } from "next/navigation";
import { notifyClientSMS } from "./notifyClientSMS";
import { notifyAgentSMS } from "./notifyAgentSMS";
import { createContactEmail } from "./createContactEmail";
import { ensureHumanAccess } from "./ensureHumanAccess";

export async function addContact(form: FormData) {
  try {
    await ensureHumanAccess(form);

    // TODO: Validate
    const contact = {
      phone: form.get("phone")?.toString() ?? "",
      email: form.get("email")?.toString() ?? "",
      message: form.get("message")?.toString() ?? "",
    };

    await Promise.allSettled([
      notifyAgentSMS([
        // Message:
        "Medagent.pl:",
        contact.phone,
        contact.email,
        contact.message,
      ]),
      createContactEmail(contact),
      notifyClientSMS(contact, [
        `Dziękuję za pozostawienie kontaktu na mojej stronie medagent.pl. `,
        `\n`,
        `\n`,
        `Oddzwonię jak tylko będę mógł, być może już za chwilę :)`,
        `\n`,
        `\n`,
        `Do usłyszenia!`,
        `Sebastian Nowak`,
      ]),
    ]);
    // Notify client
  } catch (error: any) {
    console.error("Add Contact error:", error);
  } finally {
    redirect("/thankyou");
  }
}
