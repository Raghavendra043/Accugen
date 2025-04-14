import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { AuthContext } from "../Firebase/AuthProvider";
import { redirect, useLocation, useNavigate, useParams } from "react-router-dom";

export default function AuthPage() {

    const { user, running, signinWithToken, UserLogin } = useContext(AuthContext);

    const {method} = useParams();

    

    const navigate = useNavigate();
    const location = useLocation()
    const [redirect, setRedirect] = useState("/")
  const [screen, setScreen] = useState("login"); // login | register | otp
  const [isOrg, setIsOrg] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organizationType: "individual",
    organizationName: "",
    otp: "",
  });

  useEffect(()=>{
    setScreen(method)
  }, [method])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, organizationType: value }));
    setIsOrg(value === "organization");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (screen === "register") {
      setScreen("otp");
    } else if (screen === "login") {
      // Handle login logic
    } else if (screen === "otp") {
      // Handle OTP verification
    }
  };

    useEffect(()=>{
        if(location && location.state && location["state"]["from"]){
            setRedirect(redirect+location.state["from"])
            
            // console.log(redirect+location.state["from"])
        }
    }, [])

  return (
    <div className="authpage_container">
      <div className="authpage_card">
        {screen === "login" && (
          <>
            <h2 className="authpage_title">MyACCUGEN</h2>
            <div style={{textAlign:"center", width:"80%"}} className="hori_center">
              Send, manage, and track all your cases in one place.
            </div>
            <br/>
            <form onSubmit={handleSubmit} className="authpage_form">
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                className="authpage_input"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="authpage_input"
                required
              />
              <button type="submit" className="authpage_button"
                onClick={async ()=>{
                    const a = await UserLogin(formData.email,formData.password);
                    if(a){
                        navigate(redirect)
                    } else {

                    }

                }}
              >Login</button>
            </form>
            <p className="authpage_text">
              Don't have an account?{" "}
              <span className="authpage_link" onClick={() => {
                  navigate("/auth/register")
                }}>
                Register here
              </span>
            </p>
          </>
        )}

        {screen === "register" && (
          <>
            <h2 className="authpage_title">Register</h2>
            <form onSubmit={handleSubmit} className="authpage_form">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="authpage_input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                className="authpage_input"
                required
              />
              <div className="authpage_radio_group">
                <label className="authpage_radio_label">
                  <input
                    type="radio"
                    name="organizationType"
                    value="individual"
                    checked={formData.organizationType === "individual"}
                    onChange={handleRadioChange}
                    className="authpage_radio_input"
                  />
                  Individual
                </label>
                <label className="authpage_radio_label">
                  <input
                    type="radio"
                    name="organizationType"
                    value="organization"
                    checked={formData.organizationType === "organization"}
                    onChange={handleRadioChange}
                    className="authpage_radio_input"
                  />
                  Organization
                </label>
              </div>
              {isOrg && (
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Organization Name"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="authpage_input"
                  required
                />
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="authpage_input"
                required
              />
              <button type="submit" className="authpage_button">Register</button>
            </form>
            <p className="authpage_text">
              Already have an account?{" "}
              <span className="authpage_link" onClick={() => navigate("/auth/login")}>
                Login here
              </span>
            </p>
          </>
        )}

        {screen === "otp" && (
          <>
            
            <h2 className="authpage_title">Verify Email</h2>

            <div>6 digit OTP will be sent to your mail addres
              <b>{ formData.email }</b></div>
              <a style={{color:"blue"}}
                type="button"
                onClick={()=>{ setScreen("register") }}
              >change details ? </a><br/><br/>
            <form onSubmit={handleSubmit} className="authpage_form">
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                className="authpage_input"
                maxLength="6"
                required
              />
              <button type="submit" className="authpage_button">Verify OTP</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
