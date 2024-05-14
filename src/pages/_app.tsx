import "@/styles/globals.css";
import Sidebar from "@/components/sidebar";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { user_id } = parseCookies();
  }, []);

  /*
  if (Component.name === "Login" || Component.name === "Register") {
    return <Component {...pageProps} />;
  }
  */

  return (
    <Sidebar>
      <Component {...pageProps} />
    </Sidebar>
  );
}
