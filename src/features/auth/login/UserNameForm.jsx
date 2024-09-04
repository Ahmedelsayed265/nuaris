import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../ui/form-elements/BackButton";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { setToken, setUser } from "../../../redux/slices/authedUser";

export default function UserNameForm({ setShowLoginForm }) {
  const role = useSelector((state) => state.authRole.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/v1/web_login", {
        ...formData,
        role: role
      });
      if (res?.status === 200) {
        navigate("/dashboard");
        toast.success("Welcome To Nuaris");
        dispatch(setUser(res.data));
        dispatch(setToken(res.data.access_token));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Link to={"/reset-password"}>Forget Password?</Link>
      <div className="buttons">
        <BackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
}
