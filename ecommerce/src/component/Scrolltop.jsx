// component/Scrolltop.jsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); 
    // or behavior: "smooth"
  }, [pathname]);

  return null;
}

export default ScrollTop;
