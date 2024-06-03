import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/fetchJson";

interface RespostaSchema {
  id: string;
  descricao: string;
}

interface PerguntaSchema {
  id: string;
  titulo: string;
  respostas: RespostaSchema[];
}

interface QuestionarioSchema {
  id: string;
  nome: string;
  description: string;
}

const Resposta: React.FC<{
  descricao: string;
  setResposta: () => void;
  selecionada: boolean;
}> = ({ descricao, setResposta, selecionada }) => {
  const style = selecionada
    ? "p-7 hover:bg-black hover:text-white border-2 hover:border-white bg-grey-900 border-green-500 mx-3 rounded"
    : "p-7 hover:bg-black hover:text-white border-2 hover:border-white bg-grey-500 border-violet-500 mx-3 rounded";

  return (
    <div onClick={setResposta} onKeyDown={setResposta} className={style}>
      {descricao}
    </div>
  );
};

const Pergunta: React.FC<{
  pergunta: PerguntaSchema;
  selecionada: string | undefined;
  setResposta: (resposta: string) => void;
}> = ({ pergunta, selecionada, setResposta }) => (
  <div>
    <div className="text-lg">{pergunta?.titulo}</div>

    <div className="flex">
      {pergunta?.respostas?.map((resposta) => (
        <Resposta
          key={resposta.id}
          descricao={resposta.descricao}
          setResposta={() => setResposta(resposta.id)}
          selecionada={selecionada === resposta.id}
        />
      ))}
    </div>
  </div>
);

const Titulo: React.FC<{ titulo: string | undefined }> = ({ titulo }) => (
  <div>
    <div className="text-2xl">{titulo}</div>
  </div>
);

const Descricao: React.FC<{ descricao: string | undefined }> = ({
  descricao,
}) => (
  <div>
    <div className="text-xl">{descricao}</div>
  </div>
);

const Responder: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const [perguntas, setPerguntas] = useState<PerguntaSchema[] | undefined>([]);
  const [questionario, setQuestionario] = useState<
    QuestionarioSchema | undefined
  >(undefined);

  const [respostas, setRespostas] = useState<Map<string, string>>(new Map());
  const adicionarResposta = (pergunta: string, resposta: string) => {
    setRespostas((anterior) => new Map(anterior.set(pergunta, resposta)));
  };

  const [identificador, setItendificador] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { quiz, perguntas } = await fetchJson(`quizzes/${id}`);
      setQuestionario(quiz);
      setPerguntas(perguntas);
    })();
  }, [id]);

  const enviar = () => {
    console.log(identificador);
    console.log(respostas);
    console.log(id);
    router.push("/obrigado");
  };

  return (
    <div>
      <label>
        Indentificador:
        <input
          value={identificador}
          onChange={(e) => setItendificador(e.target.value)}
          type="text"
        />
      </label>
      <div className="btn">
        <button type="button" onClick={enviar}>
          Enviar
        </button>
      </div>

      <hr />

      <Titulo titulo={questionario?.nome} />

      <hr />

      <Descricao descricao={questionario?.description} />

      <hr />

      <div className="flex flex-col">
        {perguntas?.map((pergunta) => (
          <Pergunta
            key={pergunta.id}
            pergunta={pergunta}
            selecionada={respostas.get(pergunta.id)}
            setResposta={(resposta: string) =>
              adicionarResposta(pergunta.id, resposta)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Responder;
