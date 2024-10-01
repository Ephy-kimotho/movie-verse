import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="bg-cream min-h-screen">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
