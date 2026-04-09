import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisualEditingWrapper from "@/components/VisualEditingWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Wenche Veileder | Livs- og helseveileder",
    template: "%s | Wenche Veileder",
  },
  description:
    "Profesjonell veiledning og rådgivning for et bedre liv. Wenche tilbyr helhetlig veiledning med bakgrunn som sykepleier, foreleser og veileder.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {isDraftMode && <VisualEditingWrapper />}
      </body>
    </html>
  );
}
