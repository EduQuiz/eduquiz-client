import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Score {
  id: number;
  Usuario: { nome: string };
  pontuacao: number;
  created_at: Date;
}

interface ScoreProps {
  data: Score[];
}

export default function Score(props: ScoreProps) {
  const router = useRouter();
  return (
    <div>
      <h1>Score by id: </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Data</th>
              <th>Pontuacao</th>
              <th>Acertos</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((score, index) => (
              <tr
                key={score.id}
                className={index % 2 === 0 ? "bg-base-200" : "bg-base-100"}
              >
                <td>{score.Usuario.nome}</td>
                <td />
                <td>{score.pontuacao}</td>
                <td>{score.pontuacao / 10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let data = null;

  try {
    const resp = (
      await axios.get(`http://localhost:4000/pontuacao/${context.query.id}`)
    ).data;
    data = resp.resp;
  } catch (error) {
    console.error("Error:", error);
  }
  return {
    props: {
      data: data,
    },
  };
}
