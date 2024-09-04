import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authedUser";
import { routesConfig } from "../features/dashboard/dashboardRouterConfig";
import useGetUser from "../hooks/useGetUser";
import SideBar from "./../features/dashboard/layout/SideBar";
import Footer from "../features/dashboard/layout/Footer";
import NavBar from "../features/dashboard/layout/NavBar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data: user } = useGetUser();
  const [hoverExpand, setHoverExpand] = useState(false);
  const [manualExpand, setManualExpand] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

  return (
    <>
      <SideBar
        manualExpand={manualExpand}
        setManualExpand={setManualExpand}
        hoverExpand={hoverExpand}
        setHoverExpand={setHoverExpand}
      />
      <main className={`main_wrap ${manualExpand ? "expand" : ""}`}>
        <NavBar manualExpand={manualExpand} setManualExpand={setManualExpand} />
        <div className="router_wrapper">
          <Routes>
            {routesConfig.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>
        </div>
        <Footer />
      </main>
    </>
  );
}
