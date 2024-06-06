import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEventHandler, useState } from "react";
import Toast from "../components/toast";
import { sendJson } from "../utils/sendJson";

export default function Entrar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const router = useRouter();

  const submitLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { id } = await sendJson("criador/entrar", {
      email: username,
      senha: password,
    });
    if (id) {
      router.push("/");
    } else {
      setErrorText("Usuario ou senha incorreto.");
      setError(true);
    }
  };

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
        EduQuiz
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

        <Link href={"/registrar"}>
          <div className={"text-blue-500 hover:link"}>Registre-se</div>
        </Link>

        <button
          type="submit"
          className={"w-72 py-2 rounded-md bg-[#20DF7F] text-white"}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
