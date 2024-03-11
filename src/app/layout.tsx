import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { config } from "../../config";
import { headers } from "next/headers";
import { ContextProvider } from "../../context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlockChats",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  
  return (
    <html lang="en">
      <body className={`bg-[#FFD073] min-h-screen`}>
        <ContextProvider initialState={initialState}>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
