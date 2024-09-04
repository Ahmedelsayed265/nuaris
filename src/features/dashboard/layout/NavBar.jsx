import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";
import NotificationMenu from "./NotificationMenu";
import fav from "../../../assets/images/fav.svg";
import settingsIcon from "../../../assets/images/icons/settings.svg";
import notificationIcon from "../../../assets/images/icons/notification.svg";
import ProfileMenu from "./ProfileMenu";

export default function NavBar({ manualExpand, setManualExpand }) {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const user = useSelector((state) => state.authedUser.user);
  const subUsers = user?.subuser_set;

  return (
    <nav className="navbar">
      <div className="links">
        <ul>
          <li>
            <button
              className={`menuToggler ${manualExpand === true ? "expand" : ""}`}
              onClick={() => setManualExpand(!manualExpand)}
            >
              <span />
              <span />
              <span />
            </button>
          </li>
          <li>
            <NavLink to="/dashboard" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/live-tracker">live tracker</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/NSSM">NSSM</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings-scheduling">
              Bookings & scheduling
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="settings">
        <ul>
          <li className="settings-gear">
            <NavLink
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              to={null}
            >
              <img src={settingsIcon} alt="setting-icon" />
            </NavLink>
            <SettingsMenu
              setIsOpen={setIsSettingsOpen}
              isOpen={isSettingsOpen}
            />
          </li>

          <li className="notification">
            <NavLink
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              to={null}
            >
              <img src={notificationIcon} alt="notification-icon" />
              <span className="number">3</span>
            </NavLink>
            <NotificationMenu
              setIsOpen={setIsNotificationOpen}
              isOpen={isNotificationOpen}
            />
          </li>

          <li className="profile">
            <div
              className="dropdownButton"
              onClick={() => setProfileDropDown(!profileDropDown)}
            >
              <div className="avatar">
                <img src={user && user.logo ? user.logo : fav} alt="avatar" />
              </div>
              <div className="name">
                <h6 className={profileDropDown ? "animate" : ""}>
                  {user && user.commercial_name
                    ? user.commercial_name
                    : "Amwaj Al Bahar"}{" "}
                  <i className="fa-regular fa-angle-right" />
                </h6>
              </div>
            </div>
          </li>
        </ul>
        <ProfileMenu
          profileDropDown={profileDropDown}
          user={user}
          subUsers={subUsers}
          setProfileDropDown={setProfileDropDown}
        />
      </div>
    </nav>
  );
}
