import { SWRConfig } from "swr";
import "./globals.css";
import font from "next/font/local";
import { Client } from "./admin/Client";

const poppins = font({
  src: [
    {
      path: "../../public/SpaceGrotesk-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Ken's | Food",
  description: "Shawarma and Babeque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} font-space-grotesk`}>
        <Client>{children}</Client>
      </body>
    </html>
  );
}
