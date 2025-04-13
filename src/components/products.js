import './style.css'
import './partners.css'
import './products.css'
import "./test.css"
import "./accugen_adv.css"
import './product_page.css'
import { useParams } from 'react-router-dom'
import { Sampledata } from '../assets/data'
import { useState } from 'react'

import pro_img from '../assets/images/products/ps/iBar.png'


function Products() {

  const {type} = useParams()
  
  const [data, setData] = useState()
  
  useState(()=>{
    let D = []
    
    if(type === "tooth_based"){
      
      D = Sampledata.filter(item => item.type === 2)
    } else{
      D = Sampledata.filter(item => item.type === 1)
    }

    var final ={}
    D.forEach(item => {
      if(final[item.h]){
        if(final[item.h][item.sub]){
          final[item.h][item.sub].push(item)
        } else{
          final[item.h][item.sub] = [item]
        }
      } else{
        final[item.h] = {[item.sub]:[item]}
      }
    })
    setData(final)
  }, [type])

    return ( 
    <div>
      <div class="product_banner">
        
        <div class="FIT_W both_center">
          {type === "tooth_based" ? "Tooth-based Solutions" : "Implant Solutions" }
        </div>
      </div>

      
  <div class="product_a_container">
    
    <main class="product_a_main hori_center">
      {data && Object.keys(data).map((value, key)=>{
        return(
          <>
            <h2 className="product_a_main_title" style={{ textAlign: 'center' }}>{value}</h2>
            {data[value] && Object.keys(data[value]).map((val, k)=>{
              return(
                <>
                <div class="cat_title_sub">
                  <div class="cat_line"></div>
                  <h2 className="product_a_main_title FIT_H">{val} </h2>
                </div>
                <div className="product_a_grid">
                    {data[value][val] && data[value][val].map((val, key)=>{
                      return(
                        <div className="product_a_card">
                            <a href={ type === "implant_based" ? `/products/implant_based/${val.code}` : `/products/tooth_based/${val.code}`}>
                              <img src={pro_img} alt="ArgenZ HT+ Multilayer" className="product_a_image" />
                              <div className="FIT_W hori_center" style={{ textAlign: 'unset' }}>
                              <h3 className="product_a_product_name">{val.title}</h3>
                              <p className="product_a_product_desc">CAD/CAM Milled with Grade 5 rematitan® Titanium</p>
                              </div>
                            </a>
                        </div>
                    )})}
                </div>
                </>
              )
            })

            }
          </>
        )
      })}
      
    </main>
    
  </div>

  

    </div>  );
}

export default Products;