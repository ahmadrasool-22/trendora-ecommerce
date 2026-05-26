import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout(){

  return(
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-grow mt-20">
        <Outlet />
      </main>
      <Footer></Footer>

    </div>
  )
}
export default Layout;