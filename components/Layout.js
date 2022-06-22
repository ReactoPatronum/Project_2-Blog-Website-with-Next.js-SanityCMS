import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const dark = useSelector((store) => store.night.dark);
  return (
    <div
      className={`transition-all ease-out duration-200 ${
        !dark ? "bg-[#242525] text-white border-black" : "bg-white text-black border-black"
      }`}
    >
      <Header />
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
