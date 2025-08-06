import { HTTPError } from "ky";
import { activeCampaignAPI, Contact } from "./activeCampaignAPI";

// TODO: Envs
const ACTIVE_CAMPAIGN_LIST_ID = "4";
const ACTIVE_CAMPAIGN_MESSAGE_FIELD_ID = "1";

export async function createContactEmail(form: FormData) {
  try {
    const email = form.get("email");
    const phone = form.get("phone");
    const message = form.get("message") || "";

    const json = {
      contact: {
        email: email,
        phone: phone,
        fieldValues: [
          {
            field: ACTIVE_CAMPAIGN_MESSAGE_FIELD_ID,
            value: message,
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

    console.log("createContactEmail:", {
      contactId,
      email,
      phone,
      message,
    });

    return contactId;
  } catch (e) {
    console.error("createContactEmail Error");
    if (e instanceof HTTPError)
      console.error("createContactEmail Error", await e.response.json());
  }
}
