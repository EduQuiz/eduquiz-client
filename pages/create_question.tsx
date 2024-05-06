import ModalCreateQuiz from "../components/modal_create_question";

export default function CreateQuestion() {
  return (
    <ModalCreateQuiz
      pergId=""
      tipo="create"
      pergDescription=""
      pergTitle=""
      respostas={[]}
      modal={false}
      titleForms="Criar nova pergunta"
      onClose={() => {}}
    ></ModalCreateQuiz>
  );
}
