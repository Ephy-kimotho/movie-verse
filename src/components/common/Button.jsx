/* eslint-disable react/prop-types */
function Button({ children, moreStyles }) {
  return (
    <button className={`bg-darkBlue text-lightGray ${moreStyles}`}>
      {children}
    </button>
  );
}

export default Button;
