import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailsPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
