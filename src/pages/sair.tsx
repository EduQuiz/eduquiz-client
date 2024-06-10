import { useRouter } from "next/router";
import { useEffect } from "react";

export const Sair = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/entrar");
  }, [router]);

  return <></>;
};

export default Sair;
