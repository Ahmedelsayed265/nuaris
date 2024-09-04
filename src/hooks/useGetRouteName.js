import { useLocation } from "react-router-dom";
import { capitalizeWord } from "../utils/helper";

export default function useGetRouteName() {
  const { pathname } = useLocation();

  let filteredRoutes = pathname?.split("/");
  filteredRoutes = filteredRoutes.filter((e) => e !== "");

  const routes = [];

  const capitalizedRoutes = filteredRoutes.map((route) => {
    return route
      ?.split("-")
      .map((word) => capitalizeWord(word))
      .join(" ");
  });

  filteredRoutes.reduce((acc, curr, i) => {
    routes.push({
      name: capitalizedRoutes[i],
      to: acc + `/${curr}`
    });
    return acc + `/${curr}`;
  }, "");

  return { routes, filteredRoutes, capitalizedRoutes };
}
