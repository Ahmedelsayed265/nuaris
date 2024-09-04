import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logoH.svg";
import fav from "../../../assets/images/fav.svg";
import arrowSub from "../../../assets/images/icons/subArrow.svg";
import manageListing from "../../../assets/images/icons/manage-listing.svg";
import marketing from "../../../assets/images/icons/markiting-promotion.svg";
import analytics from "../../../assets/images/icons/Reports.svg";
import guests from "../../../assets/images/icons/guest-details.svg";
import dashboard from "../../../assets/images/icons/Dashboard.svg";

export default function SideBar({
  manualExpand,
  setManualExpand,
  hoverExpand,
  setHoverExpand
}) {
  const [sideClass, setSideClass] = useState("");

  useEffect(() => {
    if (manualExpand) {
      setSideClass("expand");
    } else if (hoverExpand && !manualExpand) {
      setSideClass("hoverExpand");
    } else {
      setSideClass("");
    }
  }, [hoverExpand, manualExpand]);

  return (
    <aside
      className={`side_bar ${sideClass}`}
      onMouseEnter={() => setHoverExpand(true)}
      onMouseLeave={() => setHoverExpand(false)}
    >
      <div className="logo_wrapper">
        <span className="logo-lg">
          <img src={logo} alt="logo" />
        </span>
        <span className="logo-sm">
          <img src={fav} alt="fav" />
        </span>
      </div>
      {/* navigation menu */}
      <ul className="navigation_menu">
        <li className="nav_item">
          <NavLink to="" end onClick={() => setManualExpand(false)}>
            <div className="icon">
              <img src={dashboard} alt="dashboard" />
            </div>
            <h6>Dashboard</h6>
          </NavLink>
        </li>
        <Accordion defaultActiveKey="0">
          {/* manage listings */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="icon">
                <img src={manageListing} alt="Manage-Listings-icon" />
              </div>
              <div className="d-flex flex-column">
                <h6>Manage Listings</h6>
              </div>
            </Accordion.Header>
            {/* sub menu */}
            <Accordion.Body>
              <ul className="sub_navigation_menu">
                <li className="sub_nav_item">
                  <NavLink to="fleet" onClick={() => setManualExpand(false)}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Fleet</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink to="addons" onClick={() => setManualExpand(false)}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Addons</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink
                    to="activities"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Activities</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink
                    to="trip-packages"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Trip Packages</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink
                    to="bookings-scheduling"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Bookings </span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink
                    to="destination"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Destination</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink to="packages" onClick={() => setManualExpand(false)}>
                    <img src={arrowSub} alt="arrow" />
                    <span>packages</span>
                  </NavLink>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          {/* markiting */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="icon">
                <img src={marketing} alt="markiting-icon" />
              </div>
              <div className="d-flex flex-column">
                <h6>Markiting & Promotions</h6>
              </div>
            </Accordion.Header>
            {/* sub menu */}
            <Accordion.Body>
              <ul className="sub_navigation_menu">
                <li className="sub_nav_item">
                  <NavLink
                    to="agent-request"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Agent Requests</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink
                    to="affiliate"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Affiliate</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink
                    to="compigens"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Compigens</span>
                  </NavLink>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          {/* Analytics */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="icon">
                <img src={analytics} alt="Analytics" />
              </div>
              <div className="d-flex flex-column">
                <h6>Analytics</h6>
              </div>
            </Accordion.Header>
            {/* sub menu */}
            <Accordion.Body>
              <ul className="sub_navigation_menu">
                <li className="sub_nav_item">
                  <NavLink to="reports" onClick={() => setManualExpand(false)}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Reports</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink to="clients" onClick={() => setManualExpand(false)}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Clients</span>
                  </NavLink>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          {/* Guest Details &  Reviews */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <div className="icon">
                <img src={guests} alt="Analytics" />
              </div>
              <div className="d-flex flex-column">
                <h6>Guest Details & Reviews</h6>
              </div>
            </Accordion.Header>
            {/* sub menu */}
            <Accordion.Body>
              <ul className="sub_navigation_menu">
                <li className="sub_nav_item">
                  <NavLink to="guests" onClick={() => setManualExpand(false)}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Guests</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink
                    to="complaint"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Complaint</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink to="rating" onClick={() => setManualExpand(false)}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Rating</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink
                    to="questions-settings"
                    onClick={() => setManualExpand(false)}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Questions</span>
                  </NavLink>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </ul>
    </aside>
  );
}
