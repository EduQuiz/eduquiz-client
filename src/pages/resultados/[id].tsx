import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/fetchJson";

interface IAcerto {
  identificador: string;
  acertos: string;
}

const Acerto: React.FC<{ acerto: IAcerto }> = ({ acerto }) => {
  const { identificador, acertos } = acerto;
  return (
    <div>
      <div>{identificador}</div>
      <div>{acertos}</div>
    </div>
  );
};

const Resultados: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [perguntas, setPerguntas] = useState(0);
  const [acertos, setAcertos] = useState<IAcerto[]>([]);

  useEffect(() => {
    (async () => {
      const { questionario, acertos } = await fetchJson(`resposta/notas/${id}`);
      setAcertos(acertos);
      setPerguntas(questionario.perguntas);
    })();
  }, [id]);

  return (
    <div>
      <div>{perguntas}</div>
      {acertos.map((acerto) => (
        <Acerto key={acerto.identificador} acerto={acerto} />
      ))}
    </div>
  );
};

export default Resultados;
