import React, { useRef, useState } from 'react'
import '../style/Style.scss'
import Student from './Student'
import { useGetStudentsQuery, useCreateStudentMutation, useUpdateStudentMutation } from '../redux/services/collegeApi'


const Students = () => {
  const formAddStudentRef = useRef();
  const formUpdateStudentRef = useRef();
  const { data: students, error, isLoading } = useGetStudentsQuery('students');
  const { data: fields_of_study, errorfields_of_study, isLoadingfields_of_study } = useGetStudentsQuery('fields_of_study');
  const [createStudent, { isLoadingCreate }] = useCreateStudentMutation();
  const [updatedStudent, { isLoadingUpdateStudent }] = useUpdateStudentMutation();
  const [studentId, setStudentId] = useState(0)
  const [studentUpdated, setStudentUpdated] = useState({
    "name": "",
    "last_name": "",
    "student_number": 0,
    "field_of_study": "",
    "img": "../image/random-avatar10.jpg",
    "cours_list": [],
    "id": "d3ec"
  })

  function handleSelectedStudent(event) {
    handlerShowUpdateFormBox();
    const id = event.target.id;
    setStudentId(id);
    students.map((student) => {
      if (student.id === id) {
        setStudentUpdated({
          "name": student.name,
          "last_name": student.last_name,
          "student_number": student.student_number,
          "field_of_study": student.field_of_study,
          "img": student.img,
          "cours_list": [],
          "id": id
        })
      }
    })
  }
  function submitUpdateStudent(event) {
    event.preventDefault();

    updatedStudent({ url: 'students', id: studentId, student: studentUpdated });
    event.target.reset();
    formUpdateStudentRef.current.style.visibility = "hidden"
  }

  function nameUpdate(e) {
    setStudentUpdated({ ...studentUpdated, name: e.target.value })
  }

  function familyUpdate(e) {
    setStudentUpdated({ ...studentUpdated, last_name: e.target.value })
  }
  function numberUpate(e) {
    setStudentUpdated({ ...studentUpdated, student_number: e.target.value })
  }
  function studyUpdate(e) {
    setStudentUpdated({ ...studentUpdated, field_of_study: e.target.value })
  }



  function submitStudent(event) {
    event.preventDefault();
    const newStudent = {
      "name": event.target['First_name'].value,
      "last_name": event.target['Last_name'].value,
      "student_number": event.target['number'].value,
      "field_of_study": event.target['Field_of_study'].value,
      "img": "/image/random-avatar1.jpg",
      "cours_list": []
    }
    createStudent({ url: 'students', student: newStudent });
    event.target.reset();
  }

  function handlerShowFormBox() {
    formAddStudentRef.current.style.visibility = "visible"
  }
  function handlerHiddenFormBox() {
    formAddStudentRef.current.style.visibility = "hidden"
  }
  function handlerShowUpdateFormBox() {
    formUpdateStudentRef.current.style.visibility = "visible"
  }
  function handlerHiddenUpdateFormBox() {
    formUpdateStudentRef.current.style.visibility = "hidden"
  }
  if (isLoading || isLoadingfields_of_study) {
    return <div>Loading.....</div>
  }
  if (error || errorfields_of_study) {
    return <div>Error : {error.message}</div>
  }

  return (
    <div className='student'>
      <div>
        <div>
          <h2>All Student</h2>
          <h4>Welcome to ....</h4>
        </div>
        <div>
          <i onClick={handlerShowFormBox} className="fa-solid fa-user-plus"></i>
        </div>
      </div>
      <div>
        {
          students?.map((student, index) => (
            <Student key={index} data={student} handleSelectedStudent={handleSelectedStudent} />
          ))
        }
      </div>

      {/* ////////////////////////////////////////////////////////////////// */}

      <div className='formAddStudent' ref={formAddStudentRef}>
        <div>
          <i className="fa-regular fa-rectangle-xmark" onClick={handlerHiddenFormBox}></i>
        </div>
        <form onSubmit={(e) => submitStudent(e)}>
          <h3><i className="fa-regular fa-user" ></i> New Student</h3>
          <div>
            <span>First name :</span>
            <input type="text" id='First_name' />
          </div>
          <div>
            <span>Last name :</span>
            <input type="text" id='Last_name' />
          </div>
          <div>
            <span>Student number :</span>
            <input type="number" id='number' />
          </div>
          <div>
            <span>Field of study :</span>
            <select name="" id="Field_of_study">
              {
                fields_of_study?.map((field_of_study, index) => (
                  <option key={index} value={field_of_study.name}>{field_of_study.name}</option>
                ))
              }
            </select>
          </div>
          <div>
            <input type="submit" value="Add Student" />
            {isLoadingCreate && ' Loading... '}
          </div>
        </form>
      </div>

      {/* ////////////////////////////////////////////////////////////////// */}


      <div className='formAddStudent' ref={formUpdateStudentRef}>
        <div>
          <i className="fa-regular fa-rectangle-xmark" onClick={handlerHiddenUpdateFormBox}></i>
        </div>
        <form onSubmit={(e) => submitUpdateStudent(e)}>
          <h3><i className="fa-regular fa-user" ></i> New Student</h3>
          <div>
            <span>First name :</span>
            <input type="text" id='First_name' value={studentUpdated.name} onChange={nameUpdate} />
          </div>
          <div>
            <span>Last name :</span>
            <input type="text" id='Last_name' value={studentUpdated.last_name} onChange={familyUpdate} />
          </div>
          <div>
            <span>Student number :</span>
            <input
              type="number" id='number' value={studentUpdated.student_number} onChange={numberUpate} />
          </div>
          <div>
            <span>Field of study :</span>
            <select name="" id="Field_of_study" onChange={studyUpdate}>
              {
                fields_of_study?.map((field_of_study, index) => (
                  <option key={index} value={field_of_study.name}>{field_of_study.name}</option>
                ))
              }
            </select>
          </div>
          <div>
            <input type="submit" value="Update" />
            {isLoadingUpdateStudent && ' Loading... '}
          </div>
        </form>
      </div>
    </div>
  )

}

export default Students