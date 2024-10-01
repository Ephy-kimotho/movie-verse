import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="bg-cinema bg-cover bg-m-center sm:bg-center shadow-overlay flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="font-roboto font-bold text-lightGray text-4xl sm:text-6xl text-balance">
          DISCOVER MOVIES LIKE NEVER BEFORE
        </h2>
        <p className="font-bold text-lightGray font-karla text-base sm:text-3xl text-balance mt-4 mb-10 sm:mt-3 sm:mb-20 ">
          Explore a vast collection of movies right at your fingertips. Whether
          you are a fan of action, heartwarming drama or thrilling mysteries, we
          have got something for everyone. Click the button below to start
          browsing.
        </p>
        <Link
          to="movies"
          className="bg-darkBlue text-white font-roboto text-xl sm:text-2xl rounded-full py-4 px-6 sm:py-5 sm:px-10 font-bold"
        >
          GET STARTED
        </Link>
      </div>
    </section>
  );
}

export default Home;
