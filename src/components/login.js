import React, { useContext, useEffect, useRef, useState } from "react";
import "./login.css";
import { AuthContext } from "../Firebase/AuthProvider";
import { redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import { sendOTP, sendToAdmin } from "../functions";

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
    phone : "",
    password: "",
    organizationType: "lab",
    organizationName: ""
  });

  const [otp, setOtp] = useState()
  const [optInp, setOtpInp] = useState()

  const [error, setError] = useState();
  const [counter, setCounter] = useState(10);

  const [password_re, setPassre] = useState()


  useEffect(()=>{
    setScreen(method)
  }, [method])

  useEffect(() => {
    if(screen === "otp"){
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
    
  }, [counter, screen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError()
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, organizationType: value }));
    // setIsOrg(value === "organization");
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (screen === "register") {
      if(formData.email.length > 0 && formData.password.length > 6
        && formData.name.length > 0 && formData.organizationName.length > 0
        && formData.phone.length > 0 && password_re === formData.password 
      ){
        setScreen("otp");
        sentopt().then(()=>{

        })
      } else {
        if(password_re !== formData.password){
          setError("Passwords does not match");  
        } else if(formData.password.length <6){
          setError("Password must be min 6 characters");
        } else{
          setError("All fields are required");
        }
        
      }
      
    } else if (screen === "login") {
      // Handle login logic
    } else if (screen === "otp") {
      // Handle OTP verification
      verifyOTP()
    }
  };

    useEffect(()=>{
        if(location && location.state && location["state"]["from"]){
            setRedirect(redirect+location.state["from"])
            
            // console.log(redirect+location.state["from"])
        }
    }, [])

    const sentopt = async()=>{
      var digits = '0123456789';
      let otp = '';
      for (let i = 0; i < 6; i++ ) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      
      setOtp(otp)
      const resp = await sendOTP(otp, formData.email)
    }
    const verifyOTP = ()=>{
      console.log(otp, optInp)
      if(otp === optInp){
        console.log("otp good")
        setScreen("done")
        sendToAdmin(formData).then((res)=>{
          console.log(res)
        })
      } else {
        setError("Invalid OTP")
        setOtpInp("")
        console.log("invalid opt")
      }
    }
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
                placeholder="Email ID *"
                value={formData.email}
                onChange={handleChange}
                className="authpage_input1"
                required
              />
              <input
                type="text"
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                className="authpage_input1"
                required
              />
              <button type="submit" className="authpage_button"
                onClick={async ()=>{
                    if(formData.email.length === 0 || formData.password.length === 0){
                      setError("All fields are required")
                      return
                    }
                    let a;
                    try{
                      console.log(`%${formData.email}%`, `%${formData.password}%`)
                      a = await UserLogin(formData.email,formData.password);
                    }catch(e){
                      console.log(e)
                      setError("Invalid Credentials")
                    }
                    
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
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                className="authpage_input1"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email ID*"
                value={formData.email}
                onChange={handleChange}
                className="authpage_input1"
                required
              />
              <input
                type="phone"
                name="phone"
                placeholder="Phone number*"
                value={formData.phone}
                onChange={handleChange}
                className="authpage_input1"
                required
              />
              <div className="authpage_radio_group">
                <label className="authpage_radio_label">
                  <input
                    type="radio"
                    name="organizationType"
                    value="lab"
                    checked={formData.organizationType === "lab"}
                    onChange={handleRadioChange}
                    className="authpage_radio_input"
                  />
                  Lab
                </label>
                <label className="authpage_radio_label">
                  <input
                    type="radio"
                    name="organizationType"
                    value="hospital"
                    checked={formData.organizationType === "hospital"}
                    onChange={handleRadioChange}
                    className="authpage_radio_input"
                  />
                  Hospital/Clinic
                </label>
              </div>
              
                <input
                  type="text"
                  name="organizationName"
                  placeholder={`${formData.organizationType} Name*`}
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="authpage_input1"
                  required
                />
              
              <input
                type="password"
                name="password"
                placeholder="Password*"
                value={formData.password}
                onChange={handleChange}
                className="authpage_input1"
                required
              />
              <input
                type="password"
                name="password_re"
                placeholder="Enter Password again"
                
                onChange={(e)=>{
                  setPassre(e.target.value)
                }}
                style={(formData.password === password_re || !password_re || !password_re.length) ? {} : {border:"1px solid red"}}
                className="authpage_input1"
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

            <div>6 digit OTP will be sent to your mail address &nbsp;
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
                // value={formData.otp}
                // onChange={handleChange}
                onChange={(e)=>setOtpInp(e.target.value)}
                className="authpage_input1"
                maxLength="6"
                required
              />
              <button type="submit" className="authpage_button">Verify OTP</button>

              <div> 
                <a type="button"
                onClick={async()=>{
                    if(counter<=0){await sentopt()}
                  }} style={counter>0 ? {textDecoration:"none"} :{color:"blue", fontWeight:"500"}} > Resend </a> {counter>0 ? `in ${counter}s` : ""}</div>
            </form>
          </>
        )}
        {
          screen === "done" && (
            <div className="reg_done" style={{textAlign:"center"}}>
              <div>   <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              </div>
              <div>Email : {formData.email}</div>
              You have successfully registered into the portal. We will validate your details and accept your request. Please note that we may contact you for the verification process. You will be notified when when your account is active
            </div>
          )
        }
        {error && <div className="hori_center FIT_W" style={{color:"red"}}>{error}</div>}
      </div>
    </div>
  );
}
