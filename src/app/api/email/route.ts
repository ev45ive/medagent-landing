import { activeCampaignAPI, Contact } from "@/app/lib/activeCampaign";
import ky from "ky";

export async function GET(request: Request) {
  try {
    const form = new FormData();

    form.set("email", `ev45ive+1231231313131@banana.com`);
    form.set("phone", "+48506619044");
    form.set("message", "wiadomosc " + Date.now());

    const json = {
      contact: {
        email: form.get("email"),
        phone: form.get("phone"),
        // firstName: "John",
        // lastName: "Doe",
        fieldValues: [
          // return Response.json(await activeCampaignAPI.get("fields").json());
          {
            field: "1",
            value: form.get("message") || "",
          },
        ],
      },
    };

    const contactRes = await activeCampaignAPI
      .post<{ contact: Contact }>("contacts", {
        json: json,
      })
      .json();

    const contactId = contactRes?.contact?.id;

    if (contactId) {
      await activeCampaignAPI.post("contactLists", {
        json: {
          contactList: {
            list: "4",
            contact: contactId,
            status: 1,
          },
        },
      });
    }

    return Response.json(contactRes);
  } catch (error: any) {
    return Response.json(
      { error: error?.message || "Unknown error" },
      { status: error?.status || 500 }
    );
  }
}
