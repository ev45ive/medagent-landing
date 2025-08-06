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
      notifyClientSMS(
        contact,
        "Dziękuję za kontakt. Oddzwonie najszybciej jak bedę mogł."
      ),
    ]);
    // Notify client
  } catch (error: any) {
    console.error("Add Contact error:", error);
  } finally {
    redirect("/thankyou");
  }
}
