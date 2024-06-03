interface Params {
  params: {
    id: string;
  };
}

const ResponderQuestionario: React.FC<Params> = ({ params: { id } }) => {
  return <>{id}</>;
};

export default ResponderQuestionario;
