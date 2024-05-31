import ClipboardJS from "clipboard";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  description: string;
}

export default function CardQuiz(props: Props) {
  const { id } = props;

  async function copie() {
    const clipboard = new ClipboardJS(".btn-copiar", {
      text: () => `http://localhost:3000/quiz/${props.id}/select_answer`,
    });

    clipboard.on("success", (e) => {
      console.log("Texto copiado com sucesso!");
      e.clearSelection();
    });

    clipboard.on("error", (e) => {
      console.error(
        "Erro ao copiar texto para a área de transferência",
        e.action,
      );
    });
  }

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl min-w-[28rem]">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{props.title}</h2>
          <div className="badge badge-secondary h-6">{props.id}</div>
        </div>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          <Link href={`/responder/${id}`}>
            <button className="btn" type="button">
              Responder
            </button>
          </Link>

          <Link href="/quiz/[id]/score" as={`/quiz/${props.id}/score`}>
            <button className="btn btn-primary" type="button">
              Visualizar
            </button>
          </Link>

          <Link
            href={`https://wa.me/?text=http://localhost:3000/quiz/${props.id}/select_answer`}
          >
            <button onClick={copie} className="btn btn-primary" type="button">
              Compartilhar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
