import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Props {
  id: string;
  pergunta: string;
  alternativas: Alternativa[];
  titleForms: string;
  modal: boolean;
  tipo: "create" | "update";
  onClose: () => void;
}

interface Pergunta {
  id: string;
  pergunta: string;
  alternativas: Alternativa[];
}

interface Alternativa {
  id: string;
  alternativa: string;
  correta: boolean;
}

export default function ModalCreateQuiz(props: Props) {
  const [pergunta, setPergunta] = useState<Pergunta>({
    id: "",
    pergunta: "",
    alternativas: [],
  });

  const [alternativas, setAlternativas] = useState<Alternativa[]>([
    { id: "", alternativa: "", correta: false },
    { id: "", alternativa: "", correta: false },
    { id: "", alternativa: "", correta: false },
    { id: "", alternativa: "", correta: false },
  ]);

  useEffect(() => {
    if (props.id) {
      const perguntaEdit: Pergunta = {
        id: props.id,
        pergunta: props.pergunta,
        alternativas: props.alternativas,
      };

      setAlternativas(perguntaEdit.alternativas);
      setPergunta(perguntaEdit);
    }
  }, [props.id, props.pergunta, props.alternativas]);

  function handleRespostaChange(index: number, description: string) {
    const updatedRespostas = [...alternativas];
    updatedRespostas[index].alternativa = description;
    setAlternativas(updatedRespostas);
  }

  function handleRespostaCheckboxChange(index: number) {
    const updatedRespostas = [...alternativas];
    updatedRespostas[index].correta = !updatedRespostas[index].correta;
    setAlternativas(updatedRespostas);
  }

  function validateAnswers(respostas: Alternativa[]): boolean {
    const trueAnswersCount = respostas.filter(
      (resposta) => resposta.alternativa,
    ).length;
    return trueAnswersCount === 1;
  }

  async function onSubmit() {
    const isValid = validateAnswers(alternativas);

    if (isValid) {
      const perguntaSubmit: Pergunta = {
        ...pergunta,
        alternativas: alternativas.filter((alternativa) => alternativa.alternativa),
      };

      if (props.tipo === "create") {
        const resp = await axios.post(
          "http://localhost:4000/pergunta",
          perguntaSubmit,
        );
      } else {
        const resp = await axios.post(
          "http://localhost:4000/pergunta/update",
          perguntaSubmit,
        );
      }

      props.onClose();
      window.location.href = "/perguntas";
      // toastEmitted(["Pergunta salvada com sucesso"], "success");
    } else {
      // toastEmitted(["Selecione uma resposta correta"], "warning");
    }
  }

  return (
    <div
      className={` ${
        !props.modal ? "w-full px-14 flex flex-col gap-6 mt-6 h-full" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{props.titleForms}</h1>
        {props.modal && (
          <IoMdCloseCircleOutline
            className="text-2xl cursor-pointer"
            onClick={() => {
              props.onClose();
            }}
          />
        )}
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
            key={resposta.id}
            className="w-full flex justify-between align-center gap-12"
          >
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">{`Resposta ${index + 1}`}</span>
              </label>
              <textarea
                value={resposta.alternativa}
                className="textarea text-xs textarea-bordered h-24"
                onChange={(e) => handleRespostaChange(index, e.target.value)}
              />
            </div>
            <div className="form-control self-end">
              <label className="label cursor-pointer">
                <span className="label-text">Resposta correta</span>
                <input
                  type="checkbox"
                  checked={resposta.correta}
                  className="checkbox text-xs checkbox-primary"
                  onChange={() => handleRespostaCheckboxChange(index)}
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
