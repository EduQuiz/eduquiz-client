import { useRouter } from "next/router";
import { useEffect } from "react";

export const Sair = () => {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "jwt=;max-age=-1;path=/;";
    router.push("/entrar");
  }, [router]);

  return <></>;
};

export default Sair;
