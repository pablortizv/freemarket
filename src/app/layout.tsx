import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app//ui/navbar";
import { Providers } from "@/redux/providers";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freemarket",
  description: "Prueba técnica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
      <AppRouterCacheProvider>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
