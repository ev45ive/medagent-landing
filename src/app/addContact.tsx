"use server";
import { redirect } from "next/navigation";

export async function addContact(form: FormData) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Auth-Token": process.env["GETRESPONSE_KEY"]!,
  };

  try {
    await sendSMS(
      `Medagent - Kontakt - ${form
        .get("email")
        ?.toString()
        .replace(".", " . ")} - ${
        form.get("phone") //
      } - ${
        form.get("message") //
      }`
    );

    const res = await fetch("https://api.getresponse.com/v3/contacts", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        campaign: CampaignId,
        // name: form.get("name"),
        email: form.get("email"),
        tags: [MedAgentTag],

        customFieldValues: [
          CountryField("Poland"),
          PhoneField(form.get("phone")),
          MessageField(form.get("message")),
        ].filter(Boolean),
        // dayOfCycle: "42",
        // scoring: 8,
        // ipAddress: "1.2.3.4",
      }),
    });

    const body = await res.text();
    try {
      console.log("res", JSON.parse(body));
    } catch (e) {
      console.log("res", body);
    }
  } catch (e) {
    console.error(e);
  }
  redirect("/thankyou");
}

async function sendSMS(message: string) {
  const token = process.env["SMSAPI_TOKEN"];

  const res = await fetch(
    "https://api.smsapi.pl/sms.do?" +
      new URLSearchParams({
        from: "2WAY",
        to: "48506619044",
        message,
        format: "json",
        encoding: "utf-8",
      }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const body = await res.json();
  console.log(body);

  return Response.json(body);
}

// https://www.smsapi.pl/docs/?#2-pojedynczy-sms

interface SmsRequest {
  to: string;
  group?: string;
  message: string;
  from?: string;
  encoding?: "utf-8" | "iso-8859-2" | "windows-1250";
  flash?: 1;
  test?: 1;
  details?: 1;
  date?: number | string;
  date_validate?: 1;
  time_restriction?: "follow" | "ignore" | "nearest_available";
  skip_foreign?: 1;
  allow_duplicates?: 1;
  idx?: string;
  check_idx?: 1;
  nounicode?: 1;
  normalize?: 1;
  fast?: 1;
  partner_id?: string;
  max_parts?: number;
  expiration_date?: number | string;
  discount_group?: string;
  notify_url?: string;
  fallback?: { type: "vms" };
  format?: "json";
}

interface SmsResponse {
  id: string;
  points: number;
  number: string;
  date_sent: string;
  submitted_number: string;
  status: string;
}

const MedAgentTag = {
  tagId: "pmJ5L",
};

const CountryField = (value: string | FormDataEntryValue | null) => ({
  customFieldId: "nOf4WZ",
  value: [value],
});
const PhoneField = (value: string | FormDataEntryValue | null) => ({
  customFieldId: "nOf4I7",
  value: [
    // Add +48 if missing:
    value
      ?.toString()
      .replace(/([\+0]?48)?(.*?)/, "048$2")
      .replace(/\s+/g, ""),
  ],
});

const MessageField = (value: string | FormDataEntryValue | null) =>
  value && {
    customFieldId: "nOf4k4", // comment
    value: [value],
  };

const CampaignId = {
  campaignId: "X80TZ",
};
