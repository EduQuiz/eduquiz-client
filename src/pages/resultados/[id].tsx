import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/fetchJson";

interface IAcerto {
  identificador: string;
  acertos: string;
  total: number;
}

const Acerto: React.FC<{ acerto: IAcerto; total: number }> = ({
  acerto,
  total,
}) => {
  const { identificador, acertos } = acerto;
  return (
    <tr>
      <td>{identificador}</td>
      <td>
        {acertos}/{total}
      </td>
    </tr>
  );
};

const Resultados: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [perguntas, setPerguntas] = useState(0);
  const [acertos, setAcertos] = useState<IAcerto[]>([]);
  const [titulo, setTitulo] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { questionario, acertos } = await fetchJson(`resposta/notas/${id}`);
      setAcertos(acertos);
      setPerguntas(questionario.perguntas);
      setTitulo(questionario.titulo);
    })();
  }, [id]);

  return (
    <div className="m-6">
      <div>Respostas para o questionário &quot;{titulo}&quot;</div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Acertos</th>
          </tr>
        </thead>
        <tbody>
          {acertos.map((acerto) => (
            <Acerto
              key={acerto.identificador}
              acerto={acerto}
              total={perguntas}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resultados;
