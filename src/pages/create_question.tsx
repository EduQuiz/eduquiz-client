import ModalCreateQuiz from "../components/modal_create_question";

export default function CreateQuestion() {
  return (
    <ModalCreateQuiz
      id=""
      tipo="create"
      pergunta=""
      alternativas={[]}
      modal={false}
      titleForms="Criar nova pergunta"
      onClose={() => {}}
    />
  );
}
