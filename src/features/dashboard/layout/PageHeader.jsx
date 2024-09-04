import useGetRouteName from "../../../hooks/useGetRouteName";
import RoutePath from "./RoutePath";

export default function PageHeader({ name, hint, currentName, removeLast }) {
  const { capitalizedRoutes } = useGetRouteName();
  const currentRoute = capitalizedRoutes[capitalizedRoutes.length - 1];
  return (
    <div className="page_header">
      <h1 className="">{name || currentRoute}</h1>
      <RoutePath
        removeLast={removeLast}
        currentName={currentName}
        hint={hint || ""}
      />
    </div>
  );
}
