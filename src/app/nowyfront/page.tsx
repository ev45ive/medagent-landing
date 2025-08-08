import Image from "next/image";
import React from "react";

// --- Data ---
const MENU = [
  { label: "Start", href: "#" },
  { label: "O mnie", href: "#" },
  { label: "Baza wiedzy", href: "#" },
  { label: "Kontakt", href: "#" },
] as const;

import lekarzPrzed from "@public/zawody/lekarz przed.jpg";
import lekarzPo from "@public/zawody/lekarz po.jpg";
import pielegniarzeRzed from "@public/zawody/pielęgniarze przed.png";
import pielegniarzepo from "@public/zawody/pielęgniarze po.png";
import fizjoterapeutaPrzed from "@public/zawody/fizjoterapeuta przed.jpg";
import fizjoterapeutaPo from "@public/zawody/fizjoterapeuta po.jpg";
import ratownikPrzed from "@public/zawody/ratownik medyczny przed.jpg";
import ratownikPo from "@public/zawody/ratownik medyczny po.jpg";
import wlascicielPrzed from "@public/zawody/właściciel przychodni przed.png";
import wlascicielPo from "@public/zawody/właściciel przychodni po.png";

import sebaImg from "@public/seba.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import pozostalePrzed from "@public/zawody/pozostałe zawody przed.jpg";
import pozostalePo from "@public/zawody/pozostałe zawody po.jpg";

const TILES = [
  {
    label: "Jestem lekarzem",
    img: lekarzPrzed,
    hoverImg: lekarzPo,
  },
  {
    label: "Jestem pielęgniarką / pielęgniarzem",
    img: pielegniarzeRzed,
    hoverImg: pielegniarzepo,
  },
  {
    label: "Jestem fizjoterapeutą",
    img: fizjoterapeutaPrzed,
    hoverImg: fizjoterapeutaPo,
  },
  {
    label: "Jestem ratownikiem medycznym",
    img: ratownikPrzed,
    hoverImg: ratownikPo,
  },
  {
    label: "Prowadzę podmiot leczniczy",
    img: wlascicielPrzed,
    hoverImg: wlascicielPo,
  },
  {
    label: "Pozostałe zawody medyczne",
    img: pozostalePrzed,
    hoverImg: pozostalePo,
  },
] as const;

const BENEFITS = [
  { title: "Szybki i wygodny proces", text: "Wszystko załatwisz online." },
  {
    title: "Najlepsze oferty",
    text: "Współpraca z renomowanymi towarzystwami.",
  },
  {
    title: "Dopasowane polisy",
    text: "Dla lekarzy, pielęgniarek i innych zawodów.",
  },
  { title: "Wsparcie agenta", text: "Pomoc na każdym etapie." },
] as const;

const CONTACT = [
  "00-001 Warszawa",
  "ul. Przykładowa 1",
  "+48 123 456 789",
] as const;

const FOOTER_LINKS = [
  { label: "Polityka prywatności", href: "#" },
  { label: "Warunki korzystania", href: "#" },
] as const;

// --- Reusable UI ---
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#f9fafa] text-[#1d2c38] grid md:grid-cols-[250px_1fr]">
    {children}
  </div>
);

const Sidebar: React.FC<DivProps> = ({ className }) => (
  <aside
    className={`bg-[#f4f8fb] border-r border-gray-200 grid content-start justify-items-center gap-6 p-4 md:p-6  ${className}`}
  >
    <SebaAvatar />
    <nav className="w-full grid gap-2">
      {MENU.map((m) => (
        <a
          key={m.label}
          href={m.href}
          className="grid items-center h-10 px-3 text-sm border-l-4 border-transparent hover:bg-[#e2edf5] hover:border-[#1aa198]"
        >
          {m.label}
        </a>
      ))}
    </nav>
  </aside>
);

const Header: React.FC = () => (
  <header className="flex gap-4 items-center ">
    {/* <div className="w-42">
      <Logo />
    </div> */}
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Ubezpieczenia dla zawodów medycznych <em>online</em>
      </h1>
      <p className="text-sm text-[#3c4a5b]">Wybierz swój zawód medyczny</p>
    </div>
  </header>
);

type TileProps = {
  label: string;
  img: string | StaticImport;
  hoverImg: string | StaticImport;
};
// hover:scale-[1.05] transition-transform duration-300 hover:z-20
const TileCard: React.FC<TileProps> = ({ label, img, hoverImg }) => (
  <a className="relative group h-44 rounded overflow-hidden block hover:scale-[1.05] transition-transform duration-300 ">
    {/* two stacked images; hover fades to the second */}
    <Image
      fill
      src={img}
      alt={label}
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
    />
    <Image
      fill
      src={hoverImg}
      alt={label}
      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out "
    />
    <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-center font-semibold">
      <div className="h-10 grid place-items-center px-2 text-sm">{label}</div>
    </div>
  </a>
);

const TilesGrid: React.FC = () => (
  <section className="grid gap-5">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {TILES.map((t) => (
        <TileCard key={t.label} {...t} />
      ))}
    </div>
  </section>
);

const Benefits: React.FC = () => (
  <section className="grid gap-4">
    <h2 className="text-xl font-semibold">
      Dlaczego warto ubezpieczyć się z Medagent.pl?
    </h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {BENEFITS.map((b) => (
        <article
          key={b.title}
          className="grid gap-1 border rounded bg-white p-4"
        >
          <h4 className="font-semibold text-sm">{b.title}</h4>
          <p className="text-sm text-[#3c4a5b]">{b.text}</p>
        </article>
      ))}
    </div>
  </section>
);

const Testimonial: React.FC = () => (
  <section className="grid gap-4 bg-[#f0f4f7] rounded p-6">
    <h2 className="text-xl font-semibold text-center">
      Zaufali mi profesjonaliści z branży medycznej
    </h2>
    <figure className="grid gap-2 max-w-xl justify-self-center text-center">
      <blockquote className="italic text-[#333]">
        „Sebastian doradził mi idealną polisę dla mojego gabinetu.
        Profesjonalizm i świetny kontakt.”
      </blockquote>
      <figcaption className="font-semibold">
        — Anna, fizjoterapeutka z Krakowa
      </figcaption>
    </figure>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-[#1d2c38] text-white">
    <div className="grid gap-6 sm:grid-cols-3 p-6">
      <div className="grid gap-2">
        <h4 className="text-sm font-semibold">medagent.pl</h4>
        <p className="text-xs">© 2025 MedAgent. Wszelkie prawa zastrzeżone.</p>
      </div>
      <div className="grid gap-1">
        <h4 className="text-sm font-semibold">Dane kontaktowe</h4>
        {CONTACT.map((c) => (
          <p key={c} className="text-xs">
            {c}
          </p>
        ))}
        <a href="mailto:kontakt@medagent.pl" className="text-xs underline">
          kontakt@medagent.pl
        </a>
      </div>
      <div className="grid gap-1">
        <h4 className="text-sm font-semibold">Linki</h4>
        {FOOTER_LINKS.map((l) => (
          <a key={l.label} href={l.href} className="text-xs underline">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
// --- Page ---
const Main: React.FC<DivProps> = ({ className }) => (
  <main className={`grid gap-8 p-6 ${className}`}>
    <Header />
    <TilesGrid />
    <Benefits />
    <Testimonial />
  </main>
);

export default function MedagentApp() {
  return (
    <div className="bg-[#f9fafa] text-[#1d2c38]">
      <div className="min-h-screen grid sm:grid-cols-[250px_1fr]">
        <Sidebar className="order-2 sm:order-1" />
        <Main className="order-1 " />
      </div>
      <Footer />
    </div>
  );
}

import logoImg from "@public/11d83a0d-d2e6-4c06-8192-8a7321172561.png";
const Logo = () => <Image src={logoImg} alt="" className="" priority />;

const SebaAvatar = () => (
  <div className="grid justify-items-center">
    <Image
      src={sebaImg}
      alt="Sebastian Nowak"
      className="object-fill w-[60%] md:w-[90%]"
      priority
    />
    <div className="bg-teal p-4 text-sm  rounded-lg shadow-md text-white  text-center w-[90%]">
      Nazywam się Sebastian Nowak. <br /><br />
      Jestem specjalistą ds. ubezpieczeń dla branży medycznej. <br /> <br />  Współpracuję
      głównie z TU Inter Polska, a także PZU, Wartą, Hestią i LLoyds.
    </div>
  </div>
);
