"use server";

import ky from "ky";

export async function sendSMS(message: string) {
  const SMSAPI = ky.create({
    headers: {
      // https://ssl.smsapi.pl/react/oauth/manage
      Authorization: `Bearer ${process.env["SMSAPI_TOKEN"]}`,
    },
    prefixUrl: "https://api.smsapi.pl/",
  });

  const res = await SMSAPI.get("sms.do", {
    searchParams: {
      // https://ssl.smsapi.pl/react/sms_settings/sendernames
      from: "OC Lekarza",
      to: "48506619044",
      // https://www.smsapi.pl/docs#20-alfabet-7bit-gsm
      message: message.slice(0, 160),
      format: "json",
      encoding: "utf-8",
    },
  });
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
