import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="inner_footer">
        <h6>
          All Rights Reserved for <Link to="/">Nuaris</Link>{" "}
          <span>{new Date().getFullYear()}.</span>
        </h6>
        <div className="links">
          <Link to="terms-conditions">Terms and Conditions</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
