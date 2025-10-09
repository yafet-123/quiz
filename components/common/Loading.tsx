import ReactLoading from 'react-loading';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <ReactLoading type="cylon" color="#165248" height={50} width={100} />
    </div>
  );
};

export default Loader;
