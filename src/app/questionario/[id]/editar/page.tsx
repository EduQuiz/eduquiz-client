interface Params {
  params: {
    id: string;
  };
}

const EditarQuestionario: React.FC<Params> = ({ params: { id } }) => {
  return <>{id}</>;
};

export default EditarQuestionario;
