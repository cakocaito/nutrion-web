import type { Metadata } from "next";
import { Instrument_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Nutrion - Facilitando a avaliação de serviços alimentares",
  description:
    "Plataforma para avaliação de serviços alimentares. Facilitando o trabalho de consultores e responsáveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${instrumentSans.variable} ${plusJakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
