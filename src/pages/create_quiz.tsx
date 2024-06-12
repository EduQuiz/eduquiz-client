import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Toast from "../components/toast";
import { fetchJson } from "../utils/fetchJson";
import { sendJson } from "../utils/sendJson";

interface Pergunta {
  id: string;
  pergunta: string;
}

export default function CreateQuiz() {
  const [providerPerguntas, setProviderPerguntas] = useState<Pergunta[]>();
  const [providerTablePerguntas, setProviderTablePerguntas] = useState<
    Pergunta[]
  >([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [perguntaSelecionada, setPerguntaSelecionada] = useState<Pergunta>();

  const [perguntas, setPerguntas] = useState([]);
  const [perguntaSelecionadas, setPerguntaSelecionadas] = useState(new Set());

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchJson("pergunta");
        setProviderPerguntas(res);
        setPerguntas(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function setPergunta(value: string) {
    const pergunta = providerPerguntas?.find(
      (pergunta) => pergunta.id === value,
    );
    if (pergunta) {
      setPerguntaSelecionada(pergunta);
    }
  }

  function onAdd() {
    setPerguntaSelecionadas(
      (anterior) => new Set(anterior.add(perguntaSelecionada?.id)),
    );

    if (perguntaSelecionada) {
      const perguntaJaAdicionada = providerTablePerguntas.find(
        (pergunta) => pergunta.id === perguntaSelecionada.id,
      );
      if (!perguntaJaAdicionada) {
        setProviderTablePerguntas((prevProviderTablePerguntas) => [
          ...(prevProviderTablePerguntas || []),
          ...(perguntaSelecionada ? [perguntaSelecionada] : []),
        ]);
      } else {
      }
    }
  }

  function handleProviderPerguntas() {
    if (providerPerguntas) {
      return providerPerguntas.map((pergunta) => pergunta.id);
    }

    return [];
  }

  function onSubmit() {
    const providerPerguntasId = handleProviderPerguntas();

    const newQuiz = {
      titulo: quizTitle,
      perguntas: Array.from(perguntaSelecionadas),
    };

    if (newQuiz.perguntas.length > 0) {
      (async () => {
        const res = await sendJson("questionario", newQuiz);
        router.push("/");
      })();
    } else {
      console.error("erro ao criar questionário");
    }
  }

  function onDeletePergunta(pergunta: Pergunta) {
    return () => {
      const updatedPerguntas = providerTablePerguntas.filter(
        (question) => question.id !== pergunta.id,
      );
      setProviderTablePerguntas(updatedPerguntas);
    };
  }

  return (
    <div className="w-full px-14 flex flex-col gap-6 mt-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Criar novo questionário</h1>
        <button className="btn btn-primary" onClick={onSubmit} type="button">
          Salvar
        </button>
      </div>

      <div className="w-full flex justify-between align-center gap-12">
        <div className="form-control w-full max-w-xl ">
          <label className="label">
            <span className="label-text">Título</span>
          </label>
          <input
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            type="text"
            className="input input-bordered w-full max-w-xl"
          />
        </div>
      </div>

      <div className="flex flex-row gap-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Pergunta</span>
          </label>
          <select
            onChange={(e) => setPergunta(e.target.value)}
            className="select select-bordered"
            defaultValue="0"
          >
            <option value={0} disabled>
              Selecione uma pergunta
            </option>
            {providerPerguntas?.map((question) => (
              <option value={question.id} key={question.id}>
                {question.pergunta}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-primary self-end"
          onClick={onAdd}
          type="button"
        >
          Adicionar
        </button>
      </div>

      <div className="overflow-auto w-full rounded-md items-center">
        {providerPerguntas && providerTablePerguntas.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {providerTablePerguntas.map((question) => (
                <tr key={question.id}>
                  <td>{question.pergunta}</td>
                  <th className="flex justify-end gap-2">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={onDeletePergunta(question)}
                      type="button"
                    >
                      Remover
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {providerTablePerguntas.length === 0 && (
          <div className="w-full my-10 justify-center flex space-x-6 border py-12 rounded-md items-center ">
            <h1 className="text-2xl text-center">
              Nenhuma pergunta adicionada
            </h1>
            <Link href={"/create_question"}>
              <div className="btn btn-primary">Adicionar pergunta</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
