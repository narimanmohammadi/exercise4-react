import React from 'react'
import '../style/Style.scss'
import { useDeleteStudentMutation } from '../redux/services/collegeApi'

function Student(props) {

  const { data, handleSelectedStudent } = props;
  const [deleteStudent] = useDeleteStudentMutation();

  return (
    <div className='profile'>
      <div>
        <img src={data.img} alt="" />
      </div>
      <div>
        <h5>
          First name :  <span className='name'>{data.name}</span>
        </h5>
        <h5>
          Last name : <span className='Last_name'>{data.last_name}</span>
        </h5>
        <h5>
          Student number : <span className='number'>{data.student_number}</span>
        </h5>
        <h5>
          Field of study : <span className="study">{data.field_of_study}</span>
        </h5>
      </div>
      <div>
        <i onClick={(e) => handleSelectedStudent(e)} id={data.id} className="fa-regular fa-pen-to-square"></i>
        <i className="fa-solid fa-user-xmark" onClick={() => deleteStudent({ url: 'students', id: data.id })}></i>
      </div>
    </div>
  )
}

export default Student