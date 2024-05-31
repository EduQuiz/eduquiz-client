import { useEffect, useState } from "react";

import { useRouter } from "next/router";

interface RespostaSchema {
  id: string;
  resposta: string;
}

interface PerguntaSchema {
  id: string;
  titulo: string;
  respostas: RespostaSchema[];
}

const Resposta: React.FC<{ resposta: RespostaSchema }> = ({ resposta }) => {
  return <pre>{resposta?.resposta}</pre>;
};

const Pergunta: React.FC<{ pergunta: PerguntaSchema }> = ({ pergunta }) => {
  return (
    <div>
      <div>
        <div>Pergunta:</div>
        <div>{pergunta?.titulo}</div>
      </div>
      <div>
        {pergunta?.respostas?.map((resposta) => (
          <Resposta key={resposta.id} resposta={resposta} />
        ))}
      </div>
    </div>
  );
};

const Responder: React.FC = () => {
  const router = useRouter();

  const [id, setId] = useState(undefined);
  const [perguntas, setPerguntas] = useState([]);
  const [questionario, setQuestionario] = useState(undefined);

  useEffect(() => {
    setId(router.query.id);
  }, [router]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/quizzes/${id}`);
      const json = await res.json();

      setQuestionario(json.quiz);
      setPerguntas(json.perguntas);
    })();
  }, [id]);

  return (
    <div>
      <div>
        <div>Título:</div>
        <div>{questionario?.nome}</div>
      </div>

      <div>
        <div>Descrição:</div>
        <div>{questionario?.description}</div>
      </div>

      <div>
        {perguntas?.map((pergunta) => (
          <Pergunta key={pergunta.id} pergunta={pergunta} />
        ))}
      </div>
    </div>
  );
};

export default Responder;
