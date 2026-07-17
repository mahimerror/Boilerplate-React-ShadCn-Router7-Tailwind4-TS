import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "./shared/navbars/Navbar";
import Footer from "./shared/footers/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <ScrollRestoration />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
