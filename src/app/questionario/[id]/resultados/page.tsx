interface Params {
  params: {
    id: string;
  };
}

const Resultados: React.FC<Params> = ({ params: { id } }) => {
  return <>{id}</>;
};

export default Resultados;
