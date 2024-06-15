import { useRouter } from "next/router";
import { type ChangeEvent, useState } from "react";
import { sendJson } from "../utils/sendJson";

interface Pergunta {
  pergunta: string;
  alternativas: Alternativa[];
}

interface Alternativa {
  ordem: number;
  alternativa: string;
}

export default function ModalCreateQuiz() {
  const router = useRouter();

  const [pergunta, setPergunta] = useState<Pergunta>({
    pergunta: "",
    alternativas: [],
  });

  const [alternativas, setAlternativas] = useState<Alternativa[]>([
    { ordem: 1, alternativa: "" },
    { ordem: 2, alternativa: "" },
    { ordem: 3, alternativa: "" },
    { ordem: 4, alternativa: "" },
  ]);

  const [radio, setRadio] = useState<number>(1);

  function handleRespostaChange(index: number, description: string) {
    const updatedRespostas = [...alternativas];
    updatedRespostas[index].alternativa = description;
    setAlternativas(updatedRespostas);
  }

  async function onSubmit() {
    const perguntaSubmit = {
      ...pergunta,
      alternativas: alternativas.map((a) => ({
        alternativa: a.alternativa,
        correta: a.ordem === radio,
      })),
    };

    sendJson("pergunta", perguntaSubmit);

    router.push("/perguntas");
  }

  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRadio(Number.parseInt(e.target.value));
  };

  return (
    <div className="m-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Criar nova pergunta</h1>
      </div>

      <div className="w-full flex justify-between align-center gap-12">
        <div className="form-control w-full max-w-xl ">
          <label className="label" htmlFor="pergunta">
            <span className="label-text">Título da pergunta</span>
          </label>
          <input
            id="pergunta"
            type="text"
            value={pergunta.pergunta}
            className="input text-xs input-bordered w-full max-w-xl"
            onChange={(e) =>
              setPergunta({ ...pergunta, pergunta: e.target.value })
            }
          />
        </div>
      </div>

      <div className="w-full flex justify-between align-center gap-2 flex-col">
        {alternativas.map((resposta, index) => (
          <div
            key={resposta.ordem}
            className="w-full flex justify-between align-center gap-12"
          >
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">{`Alternativa ${index + 1}`}</span>
              </label>
              <textarea
                value={resposta.alternativa}
                className="textarea text-xs textarea-bordered h-24"
                onChange={(e) => handleRespostaChange(index, e.target.value)}
              />
            </div>

            <div className="form-control self-center">
              <label className="label">
                <span className="m-3 label-text">Correta</span>
                <input
                  className="radio"
                  type="radio"
                  id={resposta.ordem.toString()}
                  value={resposta.ordem.toString()}
                  checked={radio === resposta.ordem}
                  onChange={handleRadio}
                  name="correta"
                />
              </label>
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary self-end w-[100px] mt-8"
          onClick={onSubmit}
          type="button"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
