export const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null; // Jika modal tidak terbuka, tidak akan dirender

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="p-4 border-b flex justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <i
            className="fa fa-close cursor-pointer"
            onClick={onClose}
            style={{ fontSize: "20px" }}
          ></i>
        </div>
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};
