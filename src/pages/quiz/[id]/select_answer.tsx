import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Pergunta {
  id: string;
  titulo: string;
  description: string;
  respostas: Resposta[];
}

interface Resposta {
  description: string;
  resultado: true;
  id: string;
}

export default function SelectAnswer() {
  // const [progress, setProgress] = useState(100);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [cont, setCont] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    localStorage.clear();
    //salva o id do quiz
    localStorage.setItem("quizId", JSON.stringify(id));
  }, [id]);

  const responder = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const valorResposta = event.currentTarget.dataset.value === "true";

    // Recupera as respostas armazenadas no localStorage ou um array vazio se ainda não houver respostas
    const respostasArmazenadas = JSON.parse(
      localStorage.getItem("respostas") || "[]",
    );

    // Adiciona a nova resposta ao array
    respostasArmazenadas.push(valorResposta);

    // Atualiza o localStorage com o novo array de respostas
    localStorage.setItem("respostas", JSON.stringify(respostasArmazenadas));
    if (cont === perguntas.length - 1) {
      router.push("/congratulations");
    } else {
      setCont(cont + 1);
    }
  };

  // useEffect(() => {
  // 	const intervalDuration = 150;

  // 	const timer = setInterval(() => {
  // 		setProgress((prevProgress) => Math.max(prevProgress - 1, 0));
  // 	}, intervalDuration);

  // 	return () => clearInterval(timer);
  // }, []);

  // const calculateColor = () => {
  // 	const percent = Math.max(progress, 0);
  // 	const hue = ((percent / 100) * 120).toString(10);
  // 	return `hsl(${hue}, 100%, 50%)`;
  // };

  // const progressBarStyle = {
  // 	background: `linear-gradient(to right, ${calculateColor()} ${progress}%, transparent ${progress}%)`,
  // };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="flex w-full h-[10%] border-b border-gray-500">
        <span className="px-4 text-[32px] text-white font-normal font-['Lexend Deca']">
          {perguntas[cont]?.titulo}
        </span>
      </div>
      <div className="w-[50%] ml-[6%] mt-[3%] text-white text-sm font-normal font-['Lexend Deca']">
        {perguntas[cont]?.description}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 justify-center h-1/2 w-2/3 mt-16">
        <div
          className="flex w-full  rounded-lg border border-violet-700 items-center justify-center hover:bg-violet-900  hover:border-white hover:cursor-pointer"
          data-value={perguntas[cont]?.respostas[0]?.resultado}
          onClick={responder}
          onKeyDown={responder}
        >
          {perguntas[cont]?.respostas[0]?.description}
        </div>
        <div
          className="flex w-full rounded-lg border border-violet-700 items-center justify-center hover:bg-violet-900 hover:border-white hover:cursor-pointer"
          data-value={perguntas[cont]?.respostas[1]?.resultado}
          onClick={responder}
          onKeyDown={responder}
        >
          {perguntas[cont]?.respostas[1]?.description}
        </div>

        <div
          className="flex w-full rounded-lg border border-violet-700 items-center justify-center hover:bg-violet-900 hover:border-white hover:cursor-pointer"
          data-value={perguntas[cont]?.respostas[2]?.resultado}
          onClick={responder}
          onKeyDown={responder}
        >
          {perguntas[cont]?.respostas[2]?.description}
        </div>
        <div
          className="flex w-full rounded-lg border border-violet-700 items-center justify-center hover:bg-violet-900 hover:border-white hover:cursor-pointer"
          data-value={perguntas[cont]?.respostas[3]?.resultado}
          onClick={responder}
          onKeyDown={responder}
        >
          {perguntas[cont]?.respostas[3]?.description}
        </div>
      </div>
      {/* <progress className="progress w-full absolute bottom-0 h-4" style={progressBarStyle}></progress> */}
    </div>
  );
}

/*
export async function getServerSideProps(context) {
  const resp = (
    await axios.get(`http://localhost:4000/pergunta/all/${context.query.id}`)
  ).data;
  return {
    props: { resp, id: context.query.id },
  };
}
*/
