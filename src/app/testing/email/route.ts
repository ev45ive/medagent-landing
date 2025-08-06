import {
  activeCampaignAPI,
  Contact,
  ContactList,
} from "@/app/lib/activeCampaignAPI";
import { HTTPError } from "ky";

const rand = Math.random().toString(36).slice(2);
const email = `ev45ive+${rand}@gmail.com`;
const phone = `phone${rand}`;
const message = `message${rand}`;

const ACTIVE_CAMPAIGN_MESSAGE_FIELD_ID = "1";
const ACTIVE_CAMPAIGN_LIST_ID = "4";

const draft = {
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

// http://localhost:3000/testing/email

export const GET = async (request: Request) => {
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
          list: ACTIVE_CAMPAIGN_LIST_ID,
          contact: contact.id,
          status: 1,
        },
      },
    });

  try {
    const { contact } = await contactPostRequest().json();

    const { contactList } = await contactListRequest(contact).json();

    return Response.json({
      draft,
      contact,
      contactList,
    });
  } catch (e) {
    if (e instanceof HTTPError) {
      return Response.json(await e.response.json());
    }
    return Response.json(e);
  }
};
