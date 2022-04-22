import React from 'react'

const Detailsrating = ({ratings}) => {
  return (
    <>
     {ratings >= 5 ? <span>5.0</span> : ratings >= 4.5 ? <span>4.5</span> : ratings >= 3.5 ? <span>3.5</span> : ratings >= 3.5 ? <span>3.5</span> : ratings >= 2.5 ? <span>2.5</span> : ratings >= 1.5 ? <span>1.5</span>  : ratings >= 1 ? <span>1.0</span> : ratings >= .5 ? <span>0.5</span> : ""}

     
        <i class = {ratings >= 1 ? "fas fa-star" : ratings >= .5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
        <i class = {ratings >= 2 ? "fas fa-star" : ratings >= 1.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
        <i class = {ratings >= 3 ? "fas fa-star" : ratings >= 2.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
        <i class = {ratings >= 4 ? "fas fa-star" : ratings >= 3.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
        <i class = {ratings >= 5 ? "fas fa-star" : ratings >= 4.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>

       
    </>
  )
}

export default Detailsrating