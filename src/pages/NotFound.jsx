import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-10">
      <h2 className="text-tomato font-extrabold font-karla text-4xl sm:text-5xl uppercase">
        Page not found !
      </h2>
      <Link
        to="/"
        className="bg-darkBlue text-white font-roboto text-xl sm:text-2xl rounded-md py-4 px-6 font-bold uppercase"
      >
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
