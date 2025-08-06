import { HTTPError } from "ky";
import { activeCampaignAPI, Contact, ContactList } from "./activeCampaignAPI";

// TODO: Envs
const ACTIVE_CAMPAIGN_LIST_ID = "4";
const ACTIVE_CAMPAIGN_MESSAGE_FIELD_ID = "1";

export async function createContactEmail(
  form: Record<"email" | "phone" | "message", string>,
  options = {
    listId: ACTIVE_CAMPAIGN_LIST_ID,
    messageFieldId: ACTIVE_CAMPAIGN_MESSAGE_FIELD_ID,
  }
) {
  try {
    const email = form["email"];
    const phone = form["phone"];
    const message = form["message"];

    const draft = {
      contact: {
        email: email,
        phone: phone,
        fieldValues: [
          {
            field: options.messageFieldId,
            value: message,
          },
        ],
      },
    };

    const contactPostRequest = () =>
      activeCampaignAPI.post<{ contact: Contact }>("contacts", {
        json: draft,
      });

    const contactListRequest = (contact: Contact) =>
      activeCampaignAPI.post<{
        contactList: ContactList;
      }>("contactLists", {
        json: {
          contactList: {
            list: options.listId,
            contact: contact.id,
            status: 1,
          },
        },
      });

    const { contact } = await contactPostRequest().json();

    const { contactList } = await contactListRequest(contact).json();

    console.log("createContactEmail:", {
      id: contact.id,
      email,
      phone,
      message,
      contact,
      contactList,
    });

    return contact.id;
  } catch (e) {
    console.error("createContactEmail Error", e);
    if (e instanceof HTTPError)
      console.error("createContactEmail Error", await e.response.json());
  }
}
