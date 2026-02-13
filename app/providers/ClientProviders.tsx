"use client"

import { ReactNode } from "react";
import NextauthProvider from "./nextauthProvider";
import Providers from "./react-query-provider";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";
import Navbar from "../_components/navbar/navbar";
import Footer from '../_components/footer/footer';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <Providers>
      <NextauthProvider>
        <HeroUIProvider>
          <Toaster />
            {children}
        </HeroUIProvider>
      </NextauthProvider>
    </Providers>
  );
}
