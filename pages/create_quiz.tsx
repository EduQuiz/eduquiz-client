import Toast from "@/components/toast";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Questionario {
  quesTittle: string;
  quesDescription: string;
  quesImage: string;
  perguntas: Pergunta[];
}

interface Perguntas {
  perguntas: Pergunta[];
}

interface Pergunta {
  id: string;
  titulo: string;
  description: string;
}

export default function CreateQuiz() {
  const [providerPerguntas, setProviderPerguntas] = useState<Pergunta[]>();
  const [providerTablePerguntas, setProviderTablePerguntas] = useState<
    Pergunta[]
  >([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizImage, setQuizImage] = useState("");
  const [perguntaSelecionada, setPerguntaSelecionada] = useState<Pergunta>();
  const [perguntaJaExiste, setPerguntaJaExiste] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = (await axios.get("http://localhost:4000/pergunta/all"))
          .data;
        console.log(resp);
        setProviderPerguntas(resp);
        console.log(providerPerguntas);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
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
        setPerguntaJaExiste(true);
      }
    }
  }

  function handleProviderPerguntas() {
    const perguntasId: string[] = [];

    providerPerguntas?.forEach((pergunta) => {
      perguntasId.push(pergunta.id);
    });

    return perguntasId;
  }

  function onSubmit() {
    const providerPerguntasId: string[] = handleProviderPerguntas();

    const newQuiz = {
      titulo: quizTitle,
      descricao: quizDescription,
      urlImageQuiz: quizImage,
      perguntas: providerPerguntasId,
    };

    console.log(newQuiz);
    if (newQuiz.perguntas.length > 0) {
      axios.post("http://localhost:4000/quizzes/create", newQuiz);
      window.location.href = "/";
    } else {
      // mensagem de erro
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
      {perguntaJaExiste && (
        <Toast
          title={"Pergunta já adicionada"}
          type={"alert-warning"}
          onClose={() => setPerguntaJaExiste(false)}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Criar novo Quiz</h1>
        <button className="btn btn-primary" onClick={onSubmit}>
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
        <div className="form-control w-full max-w-md self-end">
          <input
            value={quizImage}
            onChange={(e) => setQuizImage(e.target.value)}
            type="file"
            className="file-input file-input-bordered w-full max-w-md"
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Descrição</span>
        </label>
        <textarea
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          className="textarea textarea-bordered h-24"
        ></textarea>
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
            {providerPerguntas &&
              providerPerguntas?.map((question) => (
                <option value={question.id} key={question.id}>
                  {question.titulo}
                </option>
              ))}
          </select>
        </div>
        <button className="btn btn-primary self-end" onClick={onAdd}>
          Adicionar
        </button>
      </div>
      <div className="overflow-auto w-full rounded-md items-center">
        {providerPerguntas && providerTablePerguntas.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {providerTablePerguntas.map((question) => (
                <tr key={question.id}>
                  <td>{question.titulo}</td>
                  <td>{question.description}</td>
                  <th className="flex justify-end gap-2">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={onDeletePergunta(question)}
                    >
                      delete
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
