import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/fetchJson";
import { sendJson } from "../../utils/sendJson";

interface AlternativaSchema {
  id: string;
  alternativa: string;
}

interface PerguntaSchema {
  id: string;
  pergunta: string;
  alternativas: AlternativaSchema[];
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
  <div className="m-3">
    <div className="text-lg">{pergunta?.pergunta}</div>

    <div className="flex">
      {pergunta?.alternativas?.map((alternativa) => (
        <Resposta
          key={alternativa.id}
          descricao={alternativa.alternativa}
          setResposta={() => setResposta(alternativa.id)}
          selecionada={selecionada === alternativa.id}
        />
      ))}
    </div>
  </div>
);

const Titulo: React.FC<{ titulo: string | undefined }> = ({ titulo }) => (
  <div className="m-3">
    <div className="text-2xl">{titulo}</div>
  </div>
);

const Responder: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const [perguntas, setPerguntas] = useState<PerguntaSchema[]>([]);
  const [titulo, setTitulo] = useState<string>("");

  const [respostas, setRespostas] = useState<Map<string, string>>(new Map());
  const adicionarResposta = (pergunta: string, resposta: string) => {
    setRespostas((anterior) => new Map(anterior.set(pergunta, resposta)));
  };

  const [identificador, setItendificador] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await fetchJson(`questionario/${id}`);
      if (res) {
        const { titulo, perguntas } = res;
        setTitulo(titulo);
        setPerguntas(perguntas);
      }
    })();
  }, [id]);

  const enviar = () => {
    const listaDeRespostas = Array.from(
      respostas,
      ([pergunta, alternativa]) => ({
        pergunta,
        alternativa,
      }),
    );

    sendJson("resposta", { id, identificador, respostas: listaDeRespostas });

    router.push("/obrigado");
  };

  return (
    <div className="m-6">
      <label className="m-3">
        Seu nome:
        <input
          value={identificador}
          onChange={(e) => setItendificador(e.target.value)}
          type="text"
        />
      </label>

      <hr />

      <Titulo titulo={titulo} />

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

      <hr />

      <div className="m-3">
        <div className="btn">
          <button type="button" onClick={enviar}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Responder;
