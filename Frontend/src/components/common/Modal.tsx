
const Modal = ({ fields, title }: any) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
      <h2>{title}</h2>
      <h2>{fields}</h2>
    </div>
  );
};

export default Modal;
