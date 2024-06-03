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

const Resposta: React.FC<{ resposta: RespostaSchema }> = ({ resposta }) => (
  <pre>{JSON.stringify(resposta.descricao)}</pre>
);

const Pergunta: React.FC<{ pergunta: PerguntaSchema }> = ({ pergunta }) => (
  <div>
    <div>
      <div>{pergunta?.titulo}</div>
    </div>

    <div>
      {pergunta?.respostas?.map((resposta) => (
        <Resposta key={resposta.id} resposta={resposta} />
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

  const [id, setId] = useState<string | string[] | undefined>(undefined);
  const [perguntas, setPerguntas] = useState<PerguntaSchema[] | undefined>([]);
  const [questionario, setQuestionario] = useState<
    QuestionarioSchema | undefined
  >(undefined);

  useEffect(() => {
    const { id } = router.query;
    setId(id);
  }, [router]);

  useEffect(() => {
    (async () => {
      const { quiz, perguntas } = await fetchJson(`quizzes/${id}`);
      setQuestionario(quiz);
      setPerguntas(perguntas);
    })();
  }, [id]);

  return (
    <div>
      <Titulo titulo={questionario?.nome} />
      <Descricao descricao={questionario?.description} />

      <div>
        {perguntas?.map((pergunta) => (
          <Pergunta key={pergunta.id} pergunta={pergunta} />
        ))}
      </div>
    </div>
  );
};

export default Responder;
