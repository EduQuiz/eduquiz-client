import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchJson } from "../utils/fetchJson";

interface Pergunta {
  id: string;
  pergunta: string;
  alternativas: Alternativas[];
}

interface Alternativas {
  id: string;
  alternativa: string;
  correta: boolean;
}

export default function Perguntas() {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchJson("pergunta");
        setPerguntas(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function onDelete(id: string) {
    return async () => {
      try {
        const resp = await fetch(`http://localhost:4000/pergunta/${id}`, {
          method: "DELETE",
        });
        console.log(resp);
        if (resp.status === 200) {
        } else {
          console.error("Falha ao deletar pergunta");
        }
      } catch (error) {
        console.error("Erro ao deletar pergunta");
      }
    };
  }

  return (
    <div className="w-full sm:p-0 xl:px-14 flex flex-col gap-6 mt-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Perguntas</h1>
        <Link href="/create_question" legacyBehavior>
          <button className="btn btn-primary" type="button">
            Criar pergunta
          </button>
        </Link>
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
            </tr>
          </thead>
          <tbody>
            {perguntas.map((p) => (
              <tr key={p.id}>
                <td>{p.pergunta}</td>
                <th className="flex justify-end gap-2">
                  <button
                    className="btn btn-error btn-xs"
                    onClick={onDelete(p.id)}
                    type="button"
                  >
                    Remover
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
