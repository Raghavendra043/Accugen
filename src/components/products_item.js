import './style.css'
import './partners.css'
import './products.css'
import "./test.css"
import "./accugen_adv.css"
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Sampledata } from '../assets/data'
import { AuthContext } from '../Firebase/AuthProvider'

function Products_item() {

  const navigate = useNavigate()
  const {type} = useParams()
  const {item} = useParams()

  const {user} = useContext(AuthContext)
  const [data, setData] = useState()
  useEffect(()=>{
    
    const d = Sampledata.filter(e => e.code === item)
    console.log(d)
    if(d.length){
      setData(d[0])
    } else {
      navigate("/")
    }
  }, [type, item])

  const checkAndSend = ()=>{
    if(user){
      navigate(`/order_form/${item}`)
    } else {
      navigate("/auth/login", {state:{from:`order_form/${item}`}})
    }
  }
    return ( 
    <div>
        

<section class="product_b_container">
<div class="product_b_top hori_center">
  <div class="product_b_images">
    <img src="../images/products/iBar.png" alt="Milled Titanium Bars" class="product_b_main_img" />
    
  </div>

  <div class="product_b_info">
    <h3 style={{ fontWeight: 200, textTransform: 'uppercase' }}><b>Impant solutions </b></h3>
    <h1 class="product_b_title"> ACCUGEN™ Milled rematitan® Titanium Bar</h1>
    <button class="product_b_upload_btn"
      onClick={()=>{
        checkAndSend()
      }}
    >
      SEND CASE
    </button>
    
    <div class="product_b_description">
      <h2>Description</h2>
      <p>
        At ACCUGEN™, we craft our Titanium Milled Bars from rematitan® Ti5 Grade 5 titanium, precision-milled using advanced CAD/CAM technology in our state-of-the-art, high-precision facility. Designed as a passive, durable framework for full-arch implant prostheses, these bars ensure long-term stability and exceptional patient comfort. Unlike conventional methods that rely on soldering or laser welding—prone to material fatigue over time—our bars are milled from a single solid block of titanium, delivering unmatched durability and structural integrity with a truly tension-free fit.
      </p>
      <h2>Key features</h2>
      <ul>
        <li> Passive Fit</li>
        <li>Up to a 10% increase in implant survival rate</li>
        <li>Distributes load Evenly</li>
        <li>Innovative One-Piece Milling</li>
        <li>Elite Titanium Strength</li>

        
      </ul>
    </div>
  </div>
</div>

<div class="product_b_resources hori_center">
    

    

    <div class="spec_container">
        <h1 class="spec_title">
          Specifications
        </h1>

        <div class="spec_section">
            <div class="spec_heading">Material:</div>
            <div class="spec_text">Grade 5 Titanium (rematitan® Ti5), biocompatible and corrosion-resistant
            </div>
        </div>

        <div class="spec_section">
            <div class="spec_heading">Surface Finish:</div>
            <div class="spec_text">Fully polished</div>
        </div>

        <div class="spec_section">
            <div class="spec_heading">Compatibility:</div>
            <div class="spec_text"> Compatible with most multi-unit abutments and implant systems; designed for both fixed and removable bars at the abutment level
            </div>
        </div>

        <div class="spec_section">
          <div class="spec_heading">Bar Options:</div>
          <div class="spec_text"> Available in custom dimensions for different implant configurations; multiple bar profiles and attachment options for tailored solutions.

          </div>
      </div>

        <div class="spec_section">
          <div class="spec_heading">Implant System Compatibility :</div>
          <div class="spec_text">  Nobel Biocare®, Straumann®, Dentsply Sirona®, Zimmer Biomet®, BioHorizons®, Osste, Medentika®Adin®, Bredent®, Swiss Implants®, Camlog®, and Cortex® and many more

          </div>
      </div>

      <div class="spec_section">
        <div class="spec_heading">Additional Options:</div>
        <div class="spec_text">  <ul class="spec_list">
          <li>Implant Screws</li>
          <li>Abutments</li>
          <li>Provisional try-in with PMMA</li>
          <li>3D Printed Digital Model</li>
      </ul>

        </div>
      </div>

    </div>
</div>
</section>





    </div> );
}

export default Products_item;