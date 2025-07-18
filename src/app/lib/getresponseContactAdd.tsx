"use server";

async function getresponseContactAdd(form: FormData) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Auth-Token": process.env["GETRESPONSE_KEY"]!,
  };

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
  console.log("body", body);

  try {
    console.log("res", JSON.parse(body));
  } catch (e) {
    console.log("res", body);
  }
}

export const MedAgentTag = {
  tagId: "pmJ5L",
};

export const CountryField = (value: string | FormDataEntryValue | null) => ({
  customFieldId: "nOf4WZ",
  value: [value],
});
export const PhoneField = (value: string | FormDataEntryValue | null) => ({
  customFieldId: "nOf4I7",
  value: [
    // Add +48 if missing:
    value
      ?.toString()
      .replace(/([\+0]?48)?(.*?)/, "048$2")
      .replace(/\s+/g, ""),
  ],
});

export const MessageField = (value: string | FormDataEntryValue | null) =>
  value && {
    customFieldId: "nOf4k4", // comment
    value: [value],
  };

export const CampaignId = {
  campaignId: "X80TZ",
};
