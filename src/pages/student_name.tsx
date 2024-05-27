import { useRouter } from "next/router";
// pages/codigo.tsx
import { useState } from "react";

export default function Codigo() {
  const router = useRouter();
  const [codigo, setCodigo] = useState("");

  const handleNext = () => {
    // Lógica para avançar para a próxima página
    router.push("/proxima-pagina");
  };

  return (
    <div className="container">
      <style jsx>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #1F2328;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .codigo-container {
          text-align: center;
          background-color: #1F2328;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .company-name {
          color: #FFF;
          text-align: center;
          font-family: 'Lexend Deca', sans-serif;
          font-size: 64px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .login-text {
          color: #FFF;
          text-align: center;
          font-family: 'Lexend Deca', sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px auto;
        }

        input {
          width: 300px;
          height: 45px;
          flex-shrink: 0;
          border: none;
          border-radius: 10px;
          background: #FFF;
          padding: 10px;
          margin-bottom: 20px;
          color: #1F2328;
          font-family: 'Lexend Deca', sans-serif;
        }

        ::placeholder {
          color: #1F2328;
        }

        button {
          background-color: #4caf50;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Lexend Deca', sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          text-transform: capitalize;
        }
      `}</style>
      <div className="codigo-container">
        <div className="company-name">EduQuiz</div>
        <div className="login-text">Escolha um nome para ser seu!</div>
        <form>
          <div className="form-group">
            <input
              type="text"
              placeholder="Digite aqui seu nome!"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <button type="button" onClick={handleNext}>
            Começar!
          </button>
        </form>
      </div>
    </div>
  );
}
