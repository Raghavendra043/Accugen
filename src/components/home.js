import './style.css'
import './partners.css'
import './products.css'
import "./test.css"
import "./accugen_adv.css"

// Import images
import logoDark from '../assets/images/logo_dark.webp'
import logoWhite from '../assets/images/logo_white.webp'
import heroImage from '../assets/images/hero.png'
import millingTitanium from '../assets/images/products/Milling (Titanium and Graphene).png'
import camSystem from '../assets/images/CAM System.png'
import millingRoom from '../assets/images/Milling Room.png'
import barIcon from '../assets/images/Icons/Bar icon.png'
import allOnXIcon from '../assets/images/Icons/All on X Full arch Prosthesis.png'
import implantCrownsIcon from '../assets/images/Icons/Implant Crowns and Bridges.png'
import guideIcon from '../assets/images/Icons/Guide.png'
import crownsBridgesIcon from '../assets/images/Icons/Tooth Supported Solutions/Crowns and Bridges.png'
import veneersIcon from '../assets/images/Icons/Tooth Supported Solutions/Veneers.png'
import whatsappIcon from '../assets/images/whatsapp.png'
import instagramIcon from '../assets/images/instagram.png'
import youtubeIcon from '../assets/images/youtube.png'
import linkedinIcon from '../assets/images/linkedin.png'
import imesIcoreLogo from '../assets/images/Partner Logo Pics/imes-icore Logo.png'
import exocadLogo from '../assets/images/Partner Logo Pics/Exocad Logo.webp'
import dentaurumLogo from '../assets/images/Partner Logo Pics/dentaurum.png'
import nobelBiocareLogo from '../assets/images/Partner Logo Pics/Nobel Biocare.png'
import ivoclarLogo from '../assets/images/Partner Logo Pics/ivoclar .png'
import w2pLogo from '../assets/images/Partner Logo Pics/w2p Logo.png'
import vijaiDentalLogo from '../assets/images/Partner Logo Pics/Vijai Dental Logo.png'
import graphenonoLogo from '../assets/images/Partner Logo Pics/Graphenono.png'
import shining3dLogo from '../assets/images/Partner Logo Pics/Shining 3d Logo.png'

function HomePage() {
    return ( 
    <div>
        <section class="hero">
            <div class="hero_banner_carousel">
                <div class="hero_banner_slide hero_banner_active" style={{ backgroundImage: `url(${millingTitanium})` }}>
                    <div class="hero_banner_content">
                        <div class="FIT_W FIT_H both_center">
                            <h1 class="hero_banner_title">Your Trusted Partner for Precision Dental Milling</h1>
                            <p class="hero_banner_subtitle">Where digital design meets flawless execution — every time.</p>
                            <div class="hero_banner_buttons">
                                <button class="hero_banner_button hero_solution_button">All Solutions</button>
                                <a style={{ textDecoration: 'none', color: 'black' }} href="/accugen_advantage"></a>
                                <button class="hero_banner_button">MyACCUGEN</button>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="hero_banner_slide" style={{ backgroundImage: `url(${camSystem})` }}>
                    <div class="hero_banner_content">
                        <div class="FIT_W FIT_H both_center">
                            <h1 class="hero_banner_title">Outsource Smarter. Deliver Better.</h1>
                            <p class="hero_banner_subtitle">Partner with Accugen to scale your lab or clinic with top-tier prosthetics</p>
                            <div class="hero_banner_buttons">
                                <button class="hero_banner_button hero_solution_button">All Solutions</button>
                                <button class="hero_banner_button">MyACCUGEN</button>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="hero_banner_slide" style={{ backgroundImage: `url(${millingRoom})` }}>
                    <div class="hero_banner_content">
                        <div class="FIT_W FIT_H both_center">
                            <h1 class="hero_banner_title">Precision. Speed. Perfection.</h1>
                            <p class="hero_banner_subtitle">Transforming digital dentistry with cutting-edge milling and 3D printing.</p>
                            <div class="hero_banner_buttons">
                                <button class="hero_banner_button">All Solutions</button>
                                <button class="hero_banner_button">MyACCUGEN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="feature-card">
            <div class="content FIT_H">
                <label> <span style={{ fontWeight: 700 }}>About Us </span></label>
                <p>
                    At ACCUGEN™, we're a trusted partner for dental labs and clinics, delivering high-performance milled restorations from our advanced facility in Hyderabad, India. Using German-engineered 5-axis milling and CAD/CAM technology, we specialize in full-arch implant solutions like titanium bars and All-on-X implant prosthesis. Every restoration ensures a flawless fit, strength, and aesthetics.
                </p>
            </div>
            <div class="image-section">
                <div class="image-wrapper">
                    <img src={heroImage} alt="CREOZIR" class="main-image"/>
                </div>
            </div>
        </section>

        <div class="banner_a_home">
            <div class="hori_center FIT_W" style={{ display: 'flex', flexDirection: 'row-reverse', gap: '10px', height: '100%' }}>
                <div class="banner_a_home_left FIT_W FIT_H verti_center">
                    <span> ≤ 0.002 mm</span>
                </div>
                <div class="banner_a_home_right FIT_W FIT_H verti_center">
                    Our advanced milling process delivers an incredible margin error of
                </div>
            </div>
        </div>

        <div class="solutions_card_home hori_center"> 
            <div class="cat_header">
                <a style={{ textDecoration: 'none', color: 'black' }} href="/products">
                    Implant solutions
                </a>
            </div>
            <div class="cat_des">
                Explore complete implant solutions – from single units to full-arch restorations, including custom abutments and bars.
            </div><br/>
            <section class="services">
                <a className="service-item-a" style={{ textDecoration: 'none', color: 'black' }} href="/products">
                    <div class="service-item">
                        <img src={barIcon} alt="" className="hori_center"/>
                        <label>Frameworks</label>
                    </div>
                </a>  

                <a className="service-item-a" style={{ textDecoration: 'none', color: 'black' }} href="/products">
                    <div class="service-item">
                        <img src={allOnXIcon} alt="" className="hori_center"/>
                        <label>All on X Screw-Retained Full Arch Prosthesis</label>
                    </div>
                </a>
                <a className="service-item-a" style={{ textDecoration: 'none', color: 'black' }} href="/products">
                    <div class="service-item">
                        <img src={implantCrownsIcon} alt="" className="hori_center"/>
                        <label>Implant Crowns and Bridges</label>
                    </div>
                </a>
                {/* <a className="service-item-a" style={{ textDecoration: 'none', color: 'black' }} href="/products">
                    <div class="service-item">
                        <img src={guideIcon} alt="" className="hori_center guide_img"/>
                        <label>Guides</label>
                    </div>
                </a> */}
            </section>
        </div>

        <div class="solutions_card_home hori_center"> 
            <div class="cat_header">
                <a style={{ textDecoration: 'none', color: 'black' }} href="/products">
                    Tooth-Suppported solutions
                </a>
            </div>
            <div class="cat_des">
                Explore complete tooth-supported solutions – from crowns and bridges to veneers.
            </div>
            <section class="services">
                <a className="service-item-a" style={{ textDecoration: 'none', color: 'black' }} href="./products_tooth.html">
                    <div class="service-item">
                        <img src={crownsBridgesIcon} alt="" className="hori_center"/>
                        <label>Crown & Bridge</label>
                    </div>
                </a>

                <a className="service-item-a" style={{ textDecoration: 'none', color: 'black' }} href="./products_tooth.html">
                    <div class="service-item">
                        <img src={veneersIcon} alt="" className="hori_center"/>
                        <label>Veneers</label>
                    </div>
                </a>
            </section>
        </div>
        
        <section class="partners-section">
            <h2>Our Dynamic Partners</h2>
            <div class="slider">
                <div class="slide-track">
                    <div class="slide"><img src={imesIcoreLogo} alt="Partner 1"/></div>
                    <div class="slide"><img src={exocadLogo} alt="Partner 2"/></div>
                    <div class="slide"><img src={dentaurumLogo} alt="Partner 3"/></div>
                    <div class="slide"><img src={nobelBiocareLogo} alt="Partner 4"/></div>
                    <div class="slide"><img src={ivoclarLogo} alt="Partner 5"/></div>
                    <div class="slide"><img src={w2pLogo} alt="Partner 6"/></div>
                    <div class="slide"><img src={vijaiDentalLogo} alt="Partner 7"/></div>
                    <div class="slide"><img src={graphenonoLogo} alt="Partner 8"/></div>
                    <div class="slide"><img src={shining3dLogo} alt="Partner 9"/></div>
                    
                    <div class="slide"><img src={imesIcoreLogo} alt="Partner 1"/></div>
                    <div class="slide"><img src={exocadLogo} alt="Partner 2"/></div>
                    <div class="slide"><img src={dentaurumLogo} alt="Partner 3"/></div>
                    <div class="slide"><img src={nobelBiocareLogo} alt="Partner 4"/></div>
                    <div class="slide"><img src={ivoclarLogo} alt="Partner 5"/></div>
                    <div class="slide"><img src={w2pLogo} alt="Partner 6"/></div>
                    <div class="slide"><img src={vijaiDentalLogo} alt="Partner 7"/></div>
                    <div class="slide"><img src={graphenonoLogo} alt="Partner 8"/></div>
                    <div class="slide"><img src={shining3dLogo} alt="Partner 9"/></div>
                </div>
            </div>
        </section>
    </div>
    );
}

export default HomePage;