import Link from "next/link";

const CardQuiz: React.FC<{
  id: string;
  titulo: string;
}> = ({ id, titulo }) => (
  <div className="card card-compact w-96 bg-base-100 shadow-xl min-w-[28rem]">
    <div className="card-body">
      <div className="flex justify-between">
        <h2 className="card-title">{titulo}</h2>
      </div>

      <div className="card-actions justify-end">
        <Link href={`/qrcode/${id}`}>
          <button className="btn" type="button">
            Comparlihar
          </button>
        </Link>

        <Link href={`/responder/${id}`}>
          <button className="btn" type="button">
            Responder
          </button>
        </Link>

        <Link href={`/resultados/${id}`}>
          <button className="btn" type="button">
            Resultados
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default CardQuiz;
