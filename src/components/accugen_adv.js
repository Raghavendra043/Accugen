import './style.css'
import './partners.css'
import './products.css'
import "./test.css"
import "./accugen_adv.css"


import Expert_Support from '../assets/images/accugen_adv/Expert_Support.png'
import Milling_ti_gr from '../assets/images/accugen_adv/Milling_ti_gr.png'
import Premium_Materials from '../assets/images/accugen_adv/Premium_Materials.png'
import World_Class_Technology from '../assets/images/accugen_adv/World_Class_Technology.png'

function Accgen_advantage() {
    return ( 
        <div>
            
    <div class="accu_hero">
        <div class="accu_hero_text FIT_W FIT_H both_center">
            <h1>ACCUGEN™ ADVANTAGE</h1>
            <div class="acc_hero_des">
                How does partnering with ACCUGEN™ take your lab/clinic TO THE NEXT LEVEL
            </div>
        </div>
    </div>
  <div class="accu_container">
    
    
    
    <section class="accu_section">
      <div class="accu_image-wrapper">
        <img src={World_Class_Technology} alt="Smiling woman" class="accu_image" />
        <div class="accu_overlay">
          
        </div>
      </div>
      <div class="accu_content">
        <h2 class="accu_title">  <span class="accu_highlight">World class Technology</span>, <b>Zero investment for you</b>
            </h2>
        <p class="accu_description">
            With ACCUGEN™, cutting-edge innovation is yours without the cost. Access advanced 5-axis milling, state-of-the-art CAD/CAM systems, and 3D resin printing—no need to invest in expensive equipment, manage maintenance, or train staff. We deliver the world's best technology directly to you, streamlining your workflow and elevating your restorations with precision and efficiency, all at zero upfront cost.
        </p>
        
      </div>
    </section>

    
    <section className="accu_section" style={{ flexDirection: 'row-reverse' }}>
      <div className="accu_image-wrapper">
        <img src={Premium_Materials} alt="Smiling woman" className="accu_image" />
        <div className="accu_overlay">
          
        </div>
      </div>
      <div className="accu_content">
        <h2 className="accu_title"> <span className="accu_highlight">Premium</span> Materials  & <span className="accu_highlight">Advanced</span> Techniques</h2>
        <p className="accu_description">
            Gain access to top-tier materials like Grade 5 titanium, zirconia, cobalt-chrome, graphene, and more—no waste, no storage concerns. Leverage cutting-edge techniques, including ultra-high-precision milling, to deliver precise, high-quality restorations that keep you ahead in dental innovation.
        </p>
      </div>
    </section>

    
    <section className="accu_section">
      <div className="accu_image-wrapper">
        <img src={Milling_ti_gr} alt="Smiling woman" className="accu_image" />
        <div className="accu_overlay">
          
        </div>
      </div>
      <div className="accu_content">
        <h2 className="accu_title"><span className="accu_highlight">More cases</span> and new possibilities</h2>
        <p className="accu_description">
            Partner with ACCUGEN™ to elevate your potential. Take on a higher volume of cases with ease—no constraints, no extra overhead. Whether it's zirconia crowns, complex full-arch implant solutions, or precision-milled titanium bars, we deliver seamless, top-quality restorations customized to your specifications.
        </p>
        
      </div>
    </section>

    <section className="accu_section" style={{ flexDirection: 'row-reverse' }}>
        <div className="accu_image-wrapper">
          <img src={Expert_Support} alt="Smiling woman" className="accu_image" />
          <div className="accu_overlay">
        
          </div>
        </div>
        <div className="accu_content">
          <h2 className="accu_title">Expert <span className="accu_highlight">ACCUGEN support</span></h2>
          <p className="accu_description">
            At ACCUGEN™, our milling and CAD/CAM experts are dedicated to your success. We understand your unique needs—whether it's choosing the ideal material, optimizing a digital design, or tackling complex cases. From start to finish, we provide personalized guidance and expert insights, ensuring flawless outcomes for every project, no matter the scale. With ACCUGEN™ by your side, you're never alone in delivering exceptional restorations.
          </p>
        </div>
    </section>

    

  </div>

        </div>
     );
}

export default Accgen_advantage;