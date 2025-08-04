"use client";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-500-600">
          Coś poszło nie tak!
        </h1>
        <p className="mt-4 text-gray-700">
          W najbliszym czasie skontaktuje się nasz agent.
        </p>
        <button
          onClick={() => history.back()}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Powrót
        </button>
      </div>
    </div>
  );
}
