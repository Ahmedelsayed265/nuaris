import { Fragment } from "react";
import { Link } from "react-router-dom";
import useGetRouteName from "../../../hooks/useGetRouteName";


export default function RoutePath({ currentName, hint, removeLast }) {
  const { routes } = useGetRouteName();
  const filteredRoutes = routes.slice(
    0,
    removeLast ? routes.length - 1 : routes.length
  );

  return (
    <div className="route_path">
      {filteredRoutes.map((route, i) => {
        const isLast = i === filteredRoutes.length - 1;
        return (
          <Fragment key={route.name}>
            <Link className={isLast ? "pe-none disabled" : ""} to={route.to}>
              {isLast && currentName ? currentName : route.name}
            </Link>
            {!isLast && <span> / </span>}
          </Fragment>
        );
      })}
      {hint && <small> {hint}</small>}
    </div>
  );
}
