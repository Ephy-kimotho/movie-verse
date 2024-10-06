import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Toaster } from "sonner";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-cream min-h-screen">
        <Toaster position="top-center" richColors />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
