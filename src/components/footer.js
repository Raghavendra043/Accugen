import logoWhite from '../assets/images/logos/w_logo.png'
import whatsapp from '../assets/images/social/whatsapp.png'
import youtube from '../assets/images/social/youtube.png'
import instagram from '../assets/images/social/instagram.png'
import linkedin from '../assets/images/social/linkedin.png'

function Footer() {
    return ( 
        <footer class="footer">
      <div class="footer-left FIT_H">
          <img src={logoWhite}/>
        <label>Where Dental Innovation Meets Business Growth.</label>
        
      </div>
    
      <div class="footer-links">
        <div class="link-column">
          <h3>Contact us</h3>
          <label>
              Email: contact@accugendental.com <br/>
              Mobile : +91 7075488757<br/>
              </label>
              <div class="social-icons">
                  <a href="https://api.whatsapp.com/send/?phone=917075488757&text=Hello+Accugen%21&type=phone_number&app_absent=0"><img src={whatsapp} alt="Instagram"/></a>
                  <a href="https://www.instagram.com/accugendental"><img src={instagram} alt="Facebook"/></a>
                  <a href="https://www.youtube.com/@accugendental"><img src={youtube} alt="X"/></a>
                  <a href="https://www.linkedin.com/company/accugen-digital-dental-solutions/"><img src={linkedin} alt="LinkedIn"/></a>
                </div>
        </div>
    
        
    
        <div class="link-column">
          <h3>Quick links</h3>
          <a href="#">Solutions</a>
          <a href="/accugen_advantage">ACCUGEN Advantage</a>
          <a href="#">Contact us</a>
        </div>
  
        <div class="link-column address_footers">
          
          <span style={{ fontWeight: 600 }}>Registered address:</span>
          <label style={{ fontWeight: 100 }}>6-3-244/5, Saradhadevi Street, Prem Nagar, Khairatabad, Hyderabad,
          Telangana, 500004.
          </label>
          
          <br/><br/>
  
          <span style={{ fontWeight: 600 }}><b>Facility Address:</b></span>
          <label style={{ fontWeight: 100 }}>Accugen - Digital Dental Solutions<br/>
          3rd Floor, Plot No 4R & 5R, Rajiv Gandhi Nagar, Sai Nagar, Kukatpally, Hyderabad,
          Telangana, 500037.
          </label>
          <br/>
        </div>
      </div>
    </footer>
     );
}

export default Footer;