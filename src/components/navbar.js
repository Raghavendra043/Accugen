import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import './style.css'

import logoDark from '../assets/images/logos/logo_dark.webp'
import logoWhite from '../assets/images/logos/logo_white.webp'
import acc from '../assets/images/social/acc.svg'
import Navnobile from './navmobile';

function Navbar() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navs = [
    {
      attr:"SOLUTIONS", link:"/products/implant_solutions"
    },
    {
      attr:"SOLUTIONS", link:"/products/implant_solutions"
    },
    {
      attr:"SOLUTIONS", link:"/products/implant_solutions"
    }
  ]

  const {user} = useContext( AuthContext )
    return ( 
        <nav class="navbar">
            <div class="top_bar">
                For further assistance, call us at +91 7075488757 or email contact@accugendental.com
            </div>
            {isMobile ? 
            <div className="mobile_nav_container">
            <div class="logo">
                <a style={{ textDecoration: 'none', color: 'black' }} href="/">
                <img src={logoDark} alt=""/></a>
              </div>
            <div class="burger"
              onClick={()=>{setOpen(true)}}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            {open && <Navnobile user = {user} setOpen ={setOpen}/>}
            </div>
            : 
            <div className='nav_container'>
              <div class="logo">
                <a style={{ textDecoration: 'none', color: 'black' }} href="/">
                <img src={logoDark} alt=""/></a>
              </div>
              
              <ul class="nav-links FIT_H">
                <li><a className='' href="/products/implant_solutions">SOLUTIONS</a></li>
                <li><a className='' href="/accugen_advantage">ACCUGEN™ ADVANTAGE</a></li>
                <li><a className='' href="#">CONTACT</a></li>
                <li><a className='' href="/MyACCUGEN">
                  {user ? "PROFILE" : "LOGIN"}
                </a></li>
              </ul>
              
            </div>}
      </nav>
    );
}

export default Navbar;