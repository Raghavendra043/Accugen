import { useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import './style.css'

import logoDark from '../assets/images/logo_dark.webp'
import logoWhite from '../assets/images/logo_white.webp'
import acc from '../assets/images/acc.svg'

function Navbar() {

  const {user, running} = useContext( AuthContext )
    return ( 
        <div>
            <div class="top_bar">
        For further assistance, call us at +91 7075488757 or email contact@accugendental.com
    </div>
        
        <header>
        <div class="logo">
            
            <a style={{ textDecoration: 'none', color: 'black' }} href="/">
            <img src={logoDark} alt=""/></a>
        </div>
    
        <nav>
          <ul class="nav-links">
            <li><a className='' href="/products/implant_based">SOLUTIONS</a></li>
            <li><a className='' href="/accugen_advantage">ACCUGEN™ ADVANTAGE</a></li>
            <li><a className='' href="#">CONTACT</a></li>
            <li><a className='' href="/profile">PROFILE</a></li>
            
          </ul>
        </nav>
    
        <div class="burger">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>
      </div>
    );
}

export default Navbar;