import ky from "ky";

const activeCampaignAPI = ky.create({
  prefixUrl: process.env["ACTIVECAMPAIGN_API"],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Api-Token": process.env["ACTIVECAMPAIGN_TOKEN"]!,
  },
});

export async function GET(request: Request) {
  try {
    const form = new FormData();

    form.set("email", `ev45ive@gmai.com`);
    form.set("phone", "+48506619044");
    form.set("message", "wiadomosc " + Date.now());

    const json = {
      contact: {
        email: form.get("email"),
        phone: form.get("phone"),
        firstName: "John",
        lastName: "Doe",
        // return Response.json(await activeCampaignAPI.get("fields").json());
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

type Contact = {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  cdate: string;
  udate: string;
  orgid: string;
  orgname: string;
  accountContacts: any[];
};
