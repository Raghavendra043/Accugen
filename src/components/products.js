import './style.css'
import './partners.css'
import './products.css'
import "./test.css"
import "./accugen_adv.css"
import './product_page.css'
import { useParams } from 'react-router-dom'
import { Sampledata } from '../assets/data'
import { useState } from 'react'

import pro_img from '../assets/images/products/implant/iBar.png'


function Products() {

  const {type} = useParams()
  
  const [data, setData] = useState()
  
  useState(()=>{
    let D = []
    
    if(type === "tooth_supported"){
      
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
      <div class="product_banner"
        // style={{ backgroundImage: `url(${pro_img})` }}
      >
        
        <div class="FIT_W both_center">
          {type === "tooth_supported" ? "Tooth-Supported Solutions" : "Implant Solutions" }
        </div>
      </div>

      
  <div class="product_a_container">
    
    <main class="product_a_main hori_center">
      {data && Object.keys(data).map((value, key)=>{
        return(
          <>
            <h2 className="product_a_main_title" style={{ textAlign: 'center', marginTop:"40px" }}>{value}</h2>
            {data[value] && Object.keys(data[value]).map((val, k)=>{
              return(
                <>
                {val != "no" &&<div class="cat_title_sub" style={{marginTop:"20px"}}>
                  <div class="cat_line"></div>
                  <h2 className="product_a_main_title FIT_H">{val} </h2>
                </div>}
                <div className="product_a_grid">
                    {data[value][val] && data[value][val].map((val, key)=>{
                      return(
                        <div className="product_a_card">
                            <a href={ type === "implant_solutions" ? `/products/implant_solutions/${val.code}` : `/products/tooth_supported/${val.code}`}>
                              <img src={val.img} alt="ArgenZ HT+ Multilayer" className="product_a_image" />
                              <div className="FIT_W hori_center" style={{ textAlign: 'unset' }}>
                              <h3 className="product_a_product_name">{val.title}</h3>
                              <p className="product_a_product_desc">{val.tag}</p>
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