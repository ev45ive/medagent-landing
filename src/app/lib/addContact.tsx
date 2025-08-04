"use server";

import { redirect } from "next/navigation";
import { notifyClientSMS } from "./notifyClientSMS";
import { notifyAgentSMS } from "./notifyAgentSMS";
import { createContactEmail } from "./createContactEmail";
import { ensureHumanAccess } from "./ensureHumanAccess";

export async function addContact(form: FormData) {
  try {
    await ensureHumanAccess(form);

    await Promise.allSettled([
      notifyAgentSMS(form),
      createContactEmail(form),
      notifyClientSMS(form),
    ]);

    // Notify client
  } catch (error: any) {
    console.error("Add Contact error:", error);
  } finally {
    redirect("/thankyou");
  }
}
