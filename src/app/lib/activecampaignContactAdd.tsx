"use server";
export async function activecampaignContactAdd(form: FormData) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Api-Token": process.env["ACTIVECAMPAIGN_TOKEN"]!,
  };

  const res = await fetch(process.env['ACTIVECAMPAIGN_API'] + "contacts?", {
    method: "POST",
    headers,
    body: JSON.stringify({
      contact: {
        email: form.get("email"),
        phone: form.get("phone"),
        // firstName: "John",
        // lastName: "Doe",
        fieldValues: [
          {
            field: "2",
            value: form.get("message") || "",
          },
          // {
          //   field: "6",
          //   value: "2008-01-20",
          // },
        ],
      },
    }),
  });

  console.log("AC", await res.text());
}
