import React from 'react'

const Ratings = ({rating}) => {
  return (
    <>
         <i class= {rating === 5 
          ? 
          "fas fa-star" 

          : 
          
          rating >= 4.5 
          ?

          "fas fa-star-half-alt" 
          : 
          
          rating >= 3.5 
          ? 
          "fas fa-star-half-alt" 
          : 
          rating >= 2.5 
          ? "fas fa-star-half-alt"
          :
          rating >= 1.5 
          ? 
          "fas fa-star-half-alt"  
          : 
          rating >= 1 
          ? 
          "fas fa-star-half-alt" 
          : rating >= .5 
          ? 
          "fas fa-star-half-alt" 
          : 
          "far fa-star"}></i>


          {rating >= 5 ? <span>5.0</span> : rating >= 4.5 ? <span>4.5</span> : rating >= 3.5 ? <span>3.5</span> : rating >= 3.5 ? <span>3.5</span> : rating >= 2.5 ? <span>2.5</span> : rating >= 1.5 ? <span>1.5</span>  : rating >= 1 ? <span>1.0</span> : rating >= .5 ? <span>0.5</span> : ""}
          </>
  )
}

export default Ratings