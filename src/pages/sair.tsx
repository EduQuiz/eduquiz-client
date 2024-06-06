import { cookies } from "next/headers";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const Sair = () => {
  const router = useRouter();

  useEffect(() => {
    cookies().delete("jwt");
    router.push("/entrar");
  }, [router]);

  return <></>;
};

export default Sair;
