import { useEffect } from "react";

import { useRouter } from "next/router";

import { destroyCookie } from "nookies";

export const Sair = () => {
  const router = useRouter();

  useEffect(() => {
    destroyCookie(undefined, "usuario");
    router.push("/entrar");
  }, [router]);

  return <></>;
};

export default Sair;
