import ky from "ky";

export type Contact = {
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

export const activeCampaignAPI = ky.create({
  prefixUrl: process.env["ACTIVECAMPAIGN_API"],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Api-Token": process.env["ACTIVECAMPAIGN_TOKEN"]!,
  },
});

export type ContactList = {
  status: number;
  list: string;
  contact: string;
  sdate: string;
  udate: null;
  unsubreason: string;
  campaign: null;
  message: null;
  sourceid: number;
  first_name: string;
  last_name: string;
  unsubscribeAutomation: null;
  id: string;
};
