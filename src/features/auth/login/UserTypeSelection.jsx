import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../../redux/slices/authRole";
import handWave from "../../../assets/images/icons/waving-hand.svg";

export default function UserTypeSelection({ setShowLoginForm }) {
  const role = useSelector((state) => state.authRole.role);
  const dispatch = useDispatch();
  return (
    <div className="form">
      <h2 className="head">
        Welcome Back ! <img src={handWave} alt="hand-wave" />
      </h2>
      <p className="sub-head">Please select the user type.</p>
      <div className="selection-grid">
        {["host", "agent", "service provider", "employee"].map((type) => (
          <button
            key={type}
            className={`select ${role === type ? "active" : ""}`}
            onClick={() => dispatch(setRole(type))}
          >
            {type}
          </button>
        ))}
      </div>
      <button className="next" onClick={() => setShowLoginForm(true)}>
        Next
      </button>
    </div>
  );
}
