import React, { useState } from 'react'
import '../style/Style.scss'
import college_1 from '../image/college_1.jpg'
import college_2 from '../image/college_2.jpg'
import college_3 from '../image/college_3.jpg'


const Welcome = () => {
  const [image, setImage] = useState([college_1, college_2, college_3]);
  const [count, setCount] = useState(0);

  const imageHandler = (event) => {
    if (event.target.id == 'prev') {
      if (count <= 0) {
        setCount(2)
      }else{
        setCount((prev) => prev - 1)
      }
    } else {
      if (count >= 2) {
        setCount(0)
      }else{
        setCount((prev) => prev + 1)
      }
    }
  }
  return (
    <div className='welcome'>
      <div>
        <h1><i className="fa-solid fa-crown"></i> Grand College</h1>
      </div>
      <div>
        <img src={image[count]} alt="" />
        <button onClick={imageHandler} className='prev' ><i className="fa-solid fa-circle-chevron-left" id='prev'></i></button>
        <button onClick={imageHandler} className='next' ><i className="fa-solid fa-circle-chevron-right" id='next'></i></button>
      </div>
    </div>
  )
}

export default Welcome