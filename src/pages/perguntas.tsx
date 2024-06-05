import Link from "next/link";
import { useEffect, useState } from "react";
import ModalCreateQuiz from "../components/modal_create_question";
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
  const [perguntas, setPerguntas] = useState<
    Pergunta[]
  >([]);

  const [pergunta, setPergunta] = useState<Pergunta>({
    id: "",
    pergunta: "",
    alternativas: [],
  });

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

  const onEdit = (perguntaEdit: Pergunta) => {
    if (perguntaEdit.id) {
      setPergunta(perguntaEdit);
    }
  };

  function onDelete(id: string) {
    return async () => {
      try {
        const resp = await fetch(`http://localhost:4000/pergunta/${id}`, { method: "DELETE"});
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

  function handleModalSubmit() {
    const label = document.getElementById("my-drawer-4") as HTMLElement;
    label.click();
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
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {perguntas.map((p) => (
              <tr key={p.id}>
                <td>{p.pergunta}</td>
                <th className="flex justify-end gap-2">
                  <label
                    htmlFor="my-drawer-4"
                    className="btn btn-ghost btn-xs"
                    onClick={() => onEdit(p)}
                    onKeyDown={() => onEdit(p)}
                  >
                    details
                  </label>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={onDelete(p.id)}
                    type="button"
                  >
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="drawer drawer-end w-fit">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-9999">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu w-fit min-h-full bg-gray-800 text-base-content">
            <ModalCreateQuiz
              tipo="update"
              id={pergunta.id}
              pergunta={pergunta.pergunta}
              alternativas={pergunta.alternativas}
              titleForms="Editar pergunta"
              modal={true}
              onClose={handleModalSubmit}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
