import { Accordion } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import profileIcon from "../../../../assets/images/icons/profile.svg";
import invoice from "../../../../assets/images/icons/invoice.svg";
import walletSettings from "../../../../assets/images/icons/wallet-settings.svg";
import payment from "../../../../assets/images/icons/payment.svg";
import arrowSub from "../../../../assets/images/icons/subArrow.svg";

const SideBar = () => {
  return (
    <aside className="manage_account_side_bar">
      <ul className="navigation_menu">
        <li className="nav_item">
          <NavLink end to="">
            <div className="icon" style={{ background: "#FFE5D0" }}>
              <img src={profileIcon} alt="profile info" />
            </div>
            Profile info
          </NavLink>
        </li>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="icon" style={{ background: "#CFE2FF" }}>
                <img src={walletSettings} alt="invoice" />
              </div>
              <div className="d-flex flex-column">
                <h6>Nuaris Invoices & Wallet Setting</h6>
                <span>(coming soon)</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="sub_navigation_menu">
                <li className="sub_nav_item">
                  <NavLink to="subscriptions-period" className={"disabled"}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Subscriptions period</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink to="subscriptions-statement" className={"disabled"}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Subscriptions statement </span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink to="offers-on-subscription" className={"disabled"}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Offers on Subscription</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink to="saved-cards" className={"disabled"}>
                    <img src={arrowSub} alt="arrow" />
                    <span>Saved cards</span>
                  </NavLink>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="icon" style={{ background: "#E0CFFC" }}>
                <img src={payment} alt="invoice" />
              </div>
              <div className="d-flex flex-column">
                <h6>Payments and Company VAT</h6>
                <span>(coming soon)</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="sub_navigation_menu">
                <li className="sub_nav_item">
                  <NavLink
                    to="choose-receiving-payments"
                    className={"disabled"}
                  >
                    <img src={arrowSub} alt="arrow" />
                    <span>Choose receiving payments</span>
                  </NavLink>
                </li>
                <li className="sub_nav_item">
                  <NavLink to="register-vat">
                    <img src={arrowSub} alt="arrow" />
                    <span>Register VAT</span>
                  </NavLink>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <li className="nav_item">
          <NavLink end to="invoice-design-settings">
            <div className="icon" style={{ background: "#F8D7DA" }}>
              <img src={invoice} alt="invoice design settings" />
            </div>
            Invoice Design Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
