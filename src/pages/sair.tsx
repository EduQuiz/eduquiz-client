import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useEffect } from "react";

export const Sair = () => {
  const router = useRouter();

  useEffect(() => {
    destroyCookie(undefined, "usuario");
    router.push("/entrar");
  }, [router]);

  return <></>;
};

export default Sair;
