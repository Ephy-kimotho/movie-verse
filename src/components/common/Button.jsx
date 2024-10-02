/* eslint-disable react/prop-types */
function Button({ children, moreStyles, type, handleClick }) {
  return (
    <button
      className={`bg-darkBlue text-lightGray ${moreStyles}`}
      type={type ? type : "button"}
      onClick={handleClick ? handleClick : () => console.log("button clicked")}
    >
      {children}
    </button>
  );
}

export default Button;
