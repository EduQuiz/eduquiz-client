import axios from "axios";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CardQuiz from "../components/card_quiz";

interface Quiz {
  id: string;
  nome: string;
  descricao: string;
}

interface HomeProps {
  data: Quiz[];
}

export default function Home({ data }: HomeProps) {
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
      <Link href="/create_quiz" legacyBehavior className={"flex justify-end"}>
        <AiOutlinePlusCircle
          style={{ color: "#03A4FF" }}
          className="w-10 h-10 justify-end right-6 top-6 text-blue-500 cursor-pointer"
        />
      </Link>
      <div className="w-full my-10 grid gap-y-12 gap-x-12 2xl:grid-cols-3 xl:grid-cols-2 justify-center">
        {data?.map((question, index) => (
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

export async function getServerSideProps() {
  let data: [];
  try {
    data = (await axios.get("http://localhost:4000/quizzes")).data;
  } catch (error) {
    console.error("Erro ao encontrar quizzes");
  }

  return {
    props: { data },
  };
}
