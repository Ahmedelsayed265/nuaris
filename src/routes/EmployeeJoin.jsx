import logoH from "../assets/images/logoH.svg";
import loginImage from "../assets/images/epmloyee-join.jpg";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import InputField from "../ui/form-elements/InputField";
import PasswordField from "../ui/form-elements/PasswordField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export default function EmployeeJoin() {
  const [searchParams] = useSearchParams();
  const qs = searchParams.get("qs");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    query_string: qs,
    username: "",
    password: "",
    re_password: ""
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/api/v1/employee_auth/verify_employee",
        formData
      );
      if (res?.status === 200 || res?.status === 201) {
        toast.success("Welcome To Nuaris");
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth_section">
      <div className="form_wrapper">
        <div className="form_container">
          <div className="form-header">
            <div className="logo">
              <img src={logoH} alt="logo" />
              <span />
              <h1>Employee</h1>
            </div>
          </div>
          <form className="form_ui" onSubmit={handleSubmit}>
            <div className="row m-0">
              <div className="col-12 p-2">
                <InputField
                  label={"Username"}
                  placeholder="Enter Username"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="col-12 p-2">
                <PasswordField
                  label={"Password"}
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="col-12 p-2">
                <PasswordField
                  label={"Confirm Password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={formData.re_password}
                  onChange={(e) =>
                    setFormData({ ...formData, re_password: e.target.value })
                  }
                />
              </div>
              <div className="col-12 p-2 mt-3">
                <SubmitButton loading={loading} name="Login" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="image_wrapper"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundPosition: "50% 30%"
        }}
      />
    </section>
  );
}
