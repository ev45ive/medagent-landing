import Image from "next/image";

import headerImg from "@public/11d83a0d-d2e6-4c06-8192-8a7321172561.png";
import sebaImg from "@public/seba.png";
import rozmowaImg from "@public/001cbad0-9565-4843-88f6-26b095d97611.png";
import linkImg from "@public/4ae010a2-dca6-4fb8-b0bd-c64516287ef4.png";
import umowaImg from "@public/4649ff3d-bc95-44c5-884e-ee4b51546491.jpg";
import bgImg from "@public/fd9800af-827c-40c9-9e02-44cdbbfa565e.png";
import { submitForm } from "./submit";

const Header = (
  <div className="grid gap-10 md:grid-cols-2 mx-5 relative md:mb-10">
    <Image
      src={headerImg}
      alt=""
      className="w-60 md:w-60 md:absolute z-50 mx-auto"
      priority
    />

    <h1 className="text-3xl md:text-5xl font-bold text-green-800 mx-5 text-center md:hidden">
      Ubezpieczenie <br className="hidden md:inlin" />
      OC Lekarza <span className="italic font-medium">online</span>
    </h1>
  </div>
);

const RequestContactForm = () => (
  <form className="space-y-4" action={submitForm}>
    <div>
      <label className="block font-medium " htmlFor="email">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        autoComplete="email"
        type="email"
        id="email"
        name="email"
        required
        className="w-full rounded border text-black bg-white border-gray-300 p-2 mt-1"
        placeholder="Adres email"
      />
    </div>

    <div>
      <label className="block font-medium " htmlFor="phone">
        Nr Telefonu <span className="text-red-500">*</span>
      </label>
      <input
        autoComplete="tel"
        type="tel"
        id="phone"
        name="phone"
        required
        className="w-full rounded border text-black bg-white border-gray-300 p-2 mt-1"
        placeholder="Numer telefonu"
      />
    </div>

    <div>
      <label className="block font-medium " htmlFor="message">
        Dodatkowe informacje, uwagi, pytania...
      </label>
      <textarea
        id="message"
        name="message"
        placeholder="Pole opcjonalne"
        className="w-full rounded border text-black bg-white border-gray-300 p-2 mt-1"
      ></textarea>
    </div>
    <script>{
      /* js */ `
      window.BotProtectionCallback = () => {
        const btn = document.getElementById('submiteRequestForm')
        btn.disabled = false
        btn.textContent = 'Zamawiam kontakt z agentem'
      }
    `
    }</script>

    <BotProtection />

    <button
      id="submiteRequestForm"
      type="submit"
      disabled
      className="bg-green-800 disabled:bg-gray-500 text-white text-center px-6 py-4 rounded-lg shadow transition-colors duration-200  mx-auto block
      hover:bg-green-700
      focus:bg-green-700
      focus:outline-none
      focus:ring-2
      focus:ring-green-400
      active:bg-green-900"
    >
      Zamawiam kontakt z agentem
    </button>
  </form>
);

const SebaAvatar = (
  <div className="relative">
    <Image
      src={sebaImg}
      alt="Sebastian Nowak"
      className="object-fill w-[60%] md:w-[80%] mx-auto"
      priority
    />
    <div className="bg-teal p-4 text-sm md:text-xl rounded-lg shadow-md text-white transform w-[80%] mx-auto text-center">
      Nazywam się Sebastian Nowak. <br />
      Jestem specjalistą ds. ubezpieczeń dla branży medycznej. Współpracuję
      głównie z TU Inter Polska, a także PZU, Wartą, Hestią i LLoyds.
    </div>
  </div>
);

const ZamawiamKontakt = (
  <a
    href="#form"
    className="bg-green-800 text-white text-center px-6 py-4 rounded-lg shadow transition-colors duration-200 my-8 place-self-center
      hover:bg-green-700
      focus:bg-green-700
      focus:outline-none
      focus:ring-2
      focus:ring-green-400
      active:bg-green-900"
    tabIndex={0}
  >
    Zamawiam kontakt z agentem
  </a>
);

function BotProtection() {
  return (
    <div
      className="cf-turnstile"
      data-sitekey={process.env["NEXT_PUBLIC_CF_TURNSTILE"]}
      data-callback="BotProtectionCallback"
    ></div>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <section className="mx-auto container px-5 py-8 text-green-800 grid gap-2 md:gap-5">
        {Header}
        <div className="grid gap-10 md:grid-cols-2 mx-5 items-center">
          {SebaAvatar}

          <div className="grid gap-3 md:gap-8 content-start">
            <h1 className="text-3xl md:text-5xl font-bold text-green-800 mx-5 text-center hidden md:block">
              Ubezpieczenie <br className="hidden md:inlin" />
              OC Lekarza <span className="italic font-medium">online</span>
            </h1>
            <p className="text-lg text-gray-800 text-center">
              Szukasz sprawdzonego rozwiązania w zakresie ubezpieczenia OC
              Lekarza?
            </p>

            {ZamawiamKontakt}

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

            {ZamawiamKontakt}
          </div>
        </div>
      </section>

      <section
        id="form"
        className="flex flex-col items-center justify-center py-8 px-4 bg-white"
      >
        <div className="bg-teal text-white rounded-xl p-8 w-full max-w-lg shadow-md">
          <h2 className="text-xl font-bold  mb-2">Wypełnij formularz</h2>
          <p className=" mb-4">
            Oddzwonię w najbliższej wolnej chwili i porozmawiamy 😊
          </p>

          <RequestContactForm />
        </div>
      </section>

      <section className="px-4 py-12 text-center container mx-auto w-[80%] sm:w-[90%]">
        <h2 className="text-3xl font-bold mb-8">Jak działam?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Krótka rozmowa
            </h3>
            <Image
              src={rozmowaImg}
              alt="Krótka rozmowa"
              className="rounded shadow"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Wysłanie linku
            </h3>
            <Image
              src={linkImg}
              alt="Wysłanie linku"
              className="rounded shadow"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Zawarta umowa
            </h3>
            <Image
              src={umowaImg}
              alt="Zawarta umowa"
              className="rounded shadow"
            />
          </div>
        </div>

        <div className="hidden sm:block h-[50vh] sm:h-[70vh] md:h-[100vh] mt-[100px] relative bg-black">
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
        <div className="w-[90%] container mx-auto">
          <div className="grid sm:grid-cols-3 gap-5 py-10 font-bold items-start">
            <div>
              <Image
                src={headerImg}
                alt=""
                className="w-40 md:w-40 md:absolute z-50"
                priority
              />
            </div>
            <div className="grid gap-2">
              <div>Odpowiedzialność Cywilna</div>
              <div>Ochrona Prawna</div>
              <div>Majątek i życie</div>
            </div>
            <div className="grid gap-2">
              <div>
                <div>SUGGERO spółka z o.o.</div>
                <br />
                <div>KRS: 0000415242</div>
                <div>NIP: 7811877798</div>
                <br />
                <div>info@medagent.pl</div>
                <div>kontakt telefoniczny dostępny po zamówieniu kontaktu</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
