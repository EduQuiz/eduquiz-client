import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CardQuiz from "../components/card_quiz";
import { fetchJson } from "../utils/fetchJson";

interface Quiz {
  id: string;
  nome: string;
  descricao: string;
}

export default function Home() {
  const [data, setData] = useState<Quiz[]>([]);

  useEffect(() => {
    (async () => {
      const quizzes = await fetchJson("quizzes");
      setData(quizzes);
    })();
  }, []);

  if (data.length === 0) {
    return (
      <div className="w-full px-12">
        <div className="w-full my-10 justify-center flex space-x-6 h-screen items-center ">
          <h1 className="text-2xl text-center">
            Nenhum questionário encontrado
          </h1>
          <Link href="/create_quiz">
            <div className="btn btn-primary">Criar questionário</div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-12">
      <Link href="/create_quiz" className="flex justify-end">
        <AiOutlinePlusCircle
          style={{ color: "#03A4FF" }}
          className="w-10 h-10 justify-end right-6 top-6 text-blue-500 cursor-pointer"
        />
      </Link>
      <div className="w-full my-10 grid gap-y-12 gap-x-12 2xl:grid-cols-3 xl:grid-cols-2 justify-center">
        {data.map((question) => (
          <CardQuiz
            key={question.id}
            id={question.id}
            title={question.nome}
            description={question.descricao}
          />
        ))}
      </div>
    </div>
  );
}
