import Toast from "@/components/toast";
import { useState } from "react";

import axios from "axios";
import Link from "next/link";
import { setCookie } from "nookies";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  async function submitLogin(event) {
    event.preventDefault();
    const { id, nome } = (
      await axios.post("http://localhost:4000/user/register", {
        usuario: username,
        senha: password,
      })
    ).data;

    if (id) {
      setCookie(undefined, "user_id", id, {
        maxAge: 60 * 30 * 1, // half hour
      });
      document.location = "/";
    } else {
      setErrorText("Erro backend.");
      setError(true);
    }
  }

  return (
    <div
      className={
        "w-full flex flex-col h-screen justify-center items-center space-y-12"
      }
    >
      {error && (
        <Toast
          title={errorText}
          type={"alert-error"}
          onClose={() => setError(false)}
        />
      )}
      <h1 className={"text-6xl font-bold font-LexendDeca text-white"}>
        Educa7
      </h1>
      <p>Faça seu login e comece a planejar suas aulas!</p>
      <form className={"flex flex-col gap-4"} onSubmit={submitLogin}>
        <input
          type="text"
          placeholder="Usuário"
          className={"w-72 p-2 bg-white rounded-md"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className={"w-72 p-2 bg-white rounded-md"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href={"/register"}>
          <div className={"text-blue-500 hover:link"}>Entrar</div>
        </Link>
        <button
          type="submit"
          className={"w-72 py-2 rounded-md bg-[#20DF7F] text-white"}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
