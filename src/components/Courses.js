import React, { useRef, useState } from 'react'
import '../style/Style.scss'
import { useGetStudentsQuery, useCreateStudentMutation, useDeleteStudentMutation } from '../redux/services/collegeApi'

const Courses = () => {
  const { data: courses, error, isLoading } = useGetStudentsQuery('courses');
  const { data: fields_of_study, errorfields_of_study, isLoadingfields_of_study } = useGetStudentsQuery('fields_of_study');
  const [deleteCuorse] = useDeleteStudentMutation();
  const [createCuorse, isLoadingCreate] = useCreateStudentMutation();

  const [fieldOfStudy, setFieldOfStudy] = useState('')
  const formAddCuorseRef = useRef();

  function handlerSelect(event) {
    setFieldOfStudy(event.target.value);
  }

  function submitCuorse(event) {
    event.preventDefault();
    const newCuorse = {
      "field_of_study": event.target['Field_of_study'].value,
      "name": event.target['name'].value,
      "vahed": event.target['vahed'].value,
      "Instructor": event.target['Instructor'].value,
    }
    createCuorse({ url: 'courses', student: newCuorse });
    event.target.reset();
    handlerHiddenFormBox();
  }

  function handlerShowFormBox() {
    formAddCuorseRef.current.style.visibility = "visible"
  }

  function handlerHiddenFormBox() {
    formAddCuorseRef.current.style.visibility = "hidden"
  }
  return (
    <div className='courses'>
      <div>
        <h1>List of courses ({fieldOfStudy})</h1>
        <select
          name=""
          id="Field_of_study"
          onChange={handlerSelect}>
          <option value="" disabled selected hidden>select cuorse</option>
          {
            fields_of_study?.map((field_of_study, index) => (
              <option key={index} value={field_of_study.name}>{field_of_study.name}</option>
            ))
          }
        </select>
        <div onClick={handlerShowFormBox}><i class="fa-solid fa-plus" ></i></div>
      </div>
      <div>
        <table>
          <thead>
            <th>number</th>
            <th>name</th>
            <th>Instructor</th>
            <th>vahed</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
            </tr>
            {courses?.map((cuorse) => (
              (() => {
                if (cuorse.field_of_study == fieldOfStudy) {
                  return <>
                    <tr>
                      <td>#</td>
                      <td>{cuorse.name}</td>
                      <td>{cuorse.Instructor}</td>
                      <td>{cuorse.vahed}</td>
                      <td><i className="fa-solid fa-delete-left" onClick={() => deleteCuorse({ url: 'courses', id: cuorse.id })}></i></td>
                    </tr>
                  </>;
                }
              })()
            ))}
          </tbody>
        </table>
      </div>
      <div className='formAddStudent' ref={formAddCuorseRef}>
        <div >
          <i className="fa-regular fa-rectangle-xmark" onClick={handlerHiddenFormBox}></i>
        </div>
        <form onSubmit={(e) => submitCuorse(e)}>
          <h3><i class="fa-solid fa-book"></i> &nbsp; &nbsp; New Cuorse</h3>
          <div>
            <span>Name :</span>
            <input type="text" id='name' />
          </div>
          <div>
            <span>Instructor :</span>
            <input type="text" id='Instructor' />
          </div>
          <div>
            <span>Vahed :</span>
            <input type="number" id='vahed' />
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
            <input type="submit" value="Add Cuorse" />
            {/* {isLoadingCreate && ' Loading... '} */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Courses