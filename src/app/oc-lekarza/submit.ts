"use server";

import { redirect } from "next/navigation";
import { createContactEmail } from "../lib/createContactEmail";
import { ensureHumanAccess } from "../lib/ensureHumanAccess";
import { notifyAgentSMS } from "../lib/notifyAgentSMS";
import { notifyClientSMS } from "../lib/notifyClientSMS";

export async function submitForm(form: FormData) {
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
        "OC-Lekarza:",
        contact.phone,
        contact.email,
        contact.message,
      ]),
      createContactEmail(contact),
      notifyClientSMS(contact, [
        `Dziękuję za postawienie kontaktu na mojej stronie medagent.pl. `,
        `Oddzwonię jak tylko będę mógł, być może już za chwilę :)`,
        `Do usłyszenia!`,
        `Sebastian Nowak`,
      ]),
    ]);

    // Notify client
  } catch (error: any) {
    console.error("Add Contact error:", error);
  } finally {
    redirect("/oc-lekarza/thankyou");
  }
}
