import { NavLink } from "react-router-dom";
import sidebarData from "./sidebarData";

export default function SideBar({ createdYachtId }) {
  return (
    <aside className="fleet_side_bar">
      <ul className="navigation_menu">
        {sidebarData.map((item, index) => (
          <li className="nav_item" key={index} title={item.label}>
            <NavLink
              end
              to={
                createdYachtId
                  ? `${item.path}?yacht_id=${createdYachtId}`
                  : item.path
              }
            >
              <img src={item.icon} alt={item.alt} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
