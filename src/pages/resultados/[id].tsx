import { useRouter } from "next/router";

const Resultados: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>{id}</>;
};

export default Resultados;
