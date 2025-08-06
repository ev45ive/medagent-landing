"use server";

import { redirect } from "next/navigation";
import { createContactEmail } from "../lib/createContactEmail";
import { ensureHumanAccess } from "../lib/ensureHumanAccess";
import { notifyAgentSMS } from "../lib/notifyAgentSMS";
import { notifyClientSMS } from "../lib/notifyClientSMS";

export async function submitForm(form: FormData) {
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
    redirect("/oc-lekarza/thankyou");
  }
}
