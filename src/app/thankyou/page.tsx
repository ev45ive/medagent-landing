"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="grid text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-green-600">
          Dziękujemy za zapytanie!{" "}
        </h1>
        <p className="mt-4 text-gray-700">
          W najbliszym czasie skontaktuje się nasz agent.
        </p>
        <Link href={'/'}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Powrót
        </Link>
      </div>
    </div>
  );
}
