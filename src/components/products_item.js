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
        { data && 

<section class="product_b_container">
<div class="product_b_top hori_center">
  <div class="product_b_images">
    <img src={data.img} alt="Milled Titanium Bars" class="product_b_main_img" />
    
  </div>

  <div class="product_b_info">
    <h3 style={{ fontWeight: 200, textTransform: 'uppercase' }}><b>
      {data.type === 2 ? "Tooth-based Solutions" : "Implant Solutions" }
    </b></h3>
    <h1 class="product_b_title">{data.title}</h1>
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
        {data.description}
      </p>
      {data && data["key_features"] && <h2>Key features</h2>}
      <ul>
        {data && data["key_features"] && data["key_features"].map((val, k)=>{
          return(<li> {val}</li>)
        })

        }
        

        
      </ul>
    </div>
  </div>
</div>

<div class="product_b_resources hori_center">

    <div class="spec_container">
        <h1 class="spec_title">
          Specifications
        </h1>

        {data && data["specs"].map((val, k)=>{
          return(
            <>
            {Array.isArray(val.des) ?
              <div class="spec_section">
                <div class="spec_heading">{val.title}</div>
                <div class="spec_text">  
                  <ul class="spec_list">
                    { val.des.map((v, k)=>{
                      return(<li>{v}</li>)
                    })

                    }
                  </ul>
                </div>
              </div>
              : 
              <div class="spec_section">
                  <div class="spec_heading">{val.title}</div>
                  <div class="spec_text">{val.des}</div>
              </div>
            }
            </>
          )
        })

        }

    </div>
</div>
</section>




      }
    
    </div> );
}

export default Products_item;