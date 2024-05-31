import "@/styles/globals.css";
import Sidebar from "@/components/sidebar";
import type { AppProps } from "next/app";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { user_id } = parseCookies();
  }, []);

  if (Component.name === "Entrar" || Component.name === "Registrar") {
    return <Component {...pageProps} />;
  }

  return (
    <Sidebar>
      <Component {...pageProps} />
    </Sidebar>
  );
}
