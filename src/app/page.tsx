import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <style>
        {
          /* css */ `
      .text-green-800 {
        color: rgb(83, 120, 105) !important;
      }

      .bg-teal {
        background-color: #447c92;
      }

      body {
        font-family: "Open Sans", sans-serif;
      }

      ul {
        list-style-type: disclosure-closed !important;
        line-height: 2rem;
      }
      html {
        scroll-behavior: smooth;
      }`
        }
      </style>
      <section className="mx-auto container px-5 py-8 text-green-800 grid gap-2 md:gap-5">
        <div className="grid gap-10 md:grid-cols-2 mx-5 relative md:mb-10">
          <img
            src="11d83a0d-d2e6-4c06-8192-8a7321172561.png"
            alt=""
            className="w-20 md:w-40 md:absolute z-50"
          />

          <h1 className="text-3xl md:text-5xl font-bold text-green-800 mx-5 text-center md:hidden">
            Ubezpieczenie <br className="hidden md:inlin" />
            OC Lekarza <span className="italic font-medium">online</span>
          </h1>
        </div>
        <div className="grid gap-10 md:grid-cols-2 mx-5">
          <div className="relative">
            <img
              src="seba.png"
              alt="Sebastian Nowak"
              className="object-fill w-[60%] md:w-[80%] mx-auto"
            />
            <div className="bg-teal p-4 text-sm md:text-xl rounded-lg shadow-md text-white transform w-[80%] mx-auto text-center">
              Nazywam się Sebastian Nowak. <br />
              Jestem specjalistą ds. ubezpieczeń dla branży medycznej.
              Współpracuję głównie z TU Inter Polska, a także PZU i LLoyds.
            </div>
          </div>

          <div className="grid gap-8 content-start">
            <h1 className="text-3xl md:text-5xl font-bold text-green-800 mx-5 text-center hidden md:block">
              Ubezpieczenie <br className="hidden md:inlin" />
              OC Lekarza <span className="italic font-medium">online</span>
            </h1>
            <p className="text-lg text-gray-800 text-center">
              Szukasz sprawdzonego rozwiązania w zakresie ubezpieczenia OC
              Lekarza?
            </p>

            <a
              href="#form"
              className="bg-green-800 text-white text-center px-6 py-4 rounded-lg shadow hover:bg-green-800 transition my-8"
            >
              Zamawiam kontakt z agentem
            </a>

            <ul className="pl-5 space-y-1 text-lg grid gap-3">
              <li>omówimy kluczowe kwestie Twojego ubezpieczenia</li>
              <li>od razu poznasz kilka wariantów cenowych</li>
              <li>
                w ciągu kilku minut po zakończeniu rozmowy otrzymasz link do
                polisy
              </li>
              <li>
                przez cały czas trwania polisy zapewnione masz niezbędne
                wsparcie
              </li>
              <li>
                nigdy nie przegapisz terminu wznowienia polisy w kolejnych
                latach
              </li>
            </ul>

            <a
              href="#form"
              className="bg-green-800 text-white text-center px-6 py-4 rounded-lg shadow hover:bg-green-800 transition my-8"
            >
              Zamawiam kontakt z agentem
            </a>
          </div>
        </div>
      </section>

      <section
        id="form"
        className="flex flex-col items-center justify-center py-12 px-4 bg-white"
      >
        <div className="bg-green-100 rounded-xl p-8 w-full max-w-md shadow-md">
          <h2 className="text-xl font-bold text-green-800 mb-2">
            Wypełnij formularz
          </h2>
          <p className="text-green-800 mb-4">
            Oddzwonię w najbliższej wolnej chwili i porozmawiamy 😊
          </p>

          <form className="space-y-4">
            <div>
              <label
                className="block font-medium text-green-800"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded border text-black border-gray-300 p-2 mt-1"
                value="ev45ive+banana@gmail.com"
              />
            </div>

            <div>
              <label
                className="block font-medium text-green-800"
                htmlFor="phone"
              >
                Nr Telefonu <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full rounded border text-black border-gray-300 p-2 mt-1"
                value="506619044"
              />
            </div>

            <div>
              <label
                className="block font-medium text-green-800"
                htmlFor="message"
              >
                Dodatkowe informacje, uwagi, pytania...
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full rounded border text-black border-gray-300 p-2 mt-1"
              ></textarea>
            </div>

            {/*     <div  className="bg-red-100 text-red-700 p-2 rounded  flex items-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 5.636l-1.414 1.414L12 12.001l-4.95-4.95L5.636 7.05 10.586 12l-4.95 4.95 1.414 1.414L12 13.415l4.95 4.95 1.414-1.414L13.414 12l4.95-4.95z"
          />
        </svg>
        <span>Sorry, your submission failed. Please try again.</span>
      </div>   */}

            <button
              type="submit"
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-800"
            >
              Zamawiam kontakt z agentem
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 py-12 text-center container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Jak działam?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Krótka rozmowa
            </h3>
            <img
              src="001cbad0-9565-4843-88f6-26b095d97611.png"
              alt="Krótka rozmowa"
              className="rounded shadow"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Wysłanie linku
            </h3>
            <img
              src="4ae010a2-dca6-4fb8-b0bd-c64516287ef4.png"
              alt="Wysłanie linku"
              className="rounded shadow"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Zawarta umowa
            </h3>
            <img
              src="4649ff3d-bc95-44c5-884e-ee4b51546491.jpg"
              alt="Zawarta umowa"
              className="rounded shadow"
            />
          </div>
        </div>

        <div className="h-[50vh] sm:h-[70vh] md:h-[100vh] mt-[100px] relative bg-black">
          <div
            className="left-0 right-0 top-0 bottom-0 absolute bg-black opacity-65"
            style={{
              background: `url('fd9800af-827c-40c9-9e02-44cdbbfa565e.png') center  top / cover repeat`,
            }}
          ></div>
          <div className="z-20 absolute left-0 right-0 top-0 bottom-0 grid items-end h-full pb-10">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-start p-5 font-bold text-white">
              Dołącz do grona zadowolonych klientów
            </h1>
          </div>
        </div>
      </section>

      <section className="w-screen mt-5 bg-amber-100 text-black">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-3 gap-5 py-10 font-bold">
            <div>
              <img
                src="11d83a0d-d2e6-4c06-8192-8a7321172561.png"
                alt=""
                className="w-20 md:w-40 md:absolute z-50"
              />
            </div>
            <div className="grid gap-2">
              <div>Odpowiedzialność Cywilna</div>
              <div>Ochrona Prawna</div>
              <div>Majątek i życie</div>
            </div>
            <div className="grid gap-2">
              <div>info@medagent.pl</div>
              <div>kontakt telefoniczny dostępny po zamówieniu kontaktu</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
