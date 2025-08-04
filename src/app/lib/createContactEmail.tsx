import { activeCampaignAPI, Contact } from "./activeCampaign";

// TODO: Envs
const ACTIVE_CAMPAIGN_LIST_ID = "4";
const ACTIVE_CAMPAIGN_MESSAGE_FIELD_ID = "1";

export async function createContactEmail(form: FormData) {
  try {
    const json = {
      contact: {
        email: form.get("email"),
        phone: form.get("phone"),
        fieldValues: [
          {
            field: ACTIVE_CAMPAIGN_MESSAGE_FIELD_ID,
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

    await activeCampaignAPI.post("contactLists", {
      json: {
        contactList: {
          list: ACTIVE_CAMPAIGN_LIST_ID,
          contact: contactId,
          status: 1,
        },
      },
    });

    console.log("createContactEmail:", contactId);

    return contactId;
  } catch (e) {
    console.error("createContactEmail Error", e);
  }
}
