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
    const step1 = await contactPostRequest();
    const step1Response = await step1.json();

    const { contact } = step1Response;

    const step2 = await contactListRequest(contact);
    const step2Response = await step2.json();

    const { contactList } = step2Response;

    return Response.json([
      step1.url.toString(),
      Object.fromEntries(step1.headers.entries()),
      step1Response,
      step2.url.toString(),
      Object.fromEntries(step2.headers.entries()),
      step2Response,
    ]);

    //
  } catch (e) {
    if (e instanceof HTTPError) {
      return Response.json(await e.response.json());
    }
    return Response.json(e);
  }
};
