import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // you can choose as needed
});


export const metadata: Metadata = {
  title: "☀️ Weather Dashboard",
  description: "Generated by create next app",
  icons: {
    icon: "/sun.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
