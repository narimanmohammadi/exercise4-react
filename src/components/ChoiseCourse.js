import React, {useState} from 'react'
import '../style/Style.scss'
import { useGetStudentsQuery, useUpdateStudentMutation } from '../redux/services/collegeApi'

const ChoiseCourse = () => {

  const { data: instructors, error, isLoading } = useGetStudentsQuery('Instructors');
  const { data: students, errorStudent, isLoadingStudent } = useGetStudentsQuery('students');
  const { data: courses, errorCourses, isLoadingCourses } = useGetStudentsQuery('courses');
  const [courseUpdate, errorCourseUpdate, isLoadingCourseUpdate ] = useUpdateStudentMutation();


  const [fullname, setFullName] = useState('')
  const [fieldOfStudy, setfieldOfStudy] = useState('')
  const [studentId, setStudentId] = useState('')
  const [studentObject, setStudentObject] = useState()
  const [cuorseSelectedList, setCuorseSelectedList] = useState([])
  const [sumVahed, setSumVahed] = useState(0)

  function findCuorse(event) {
    const newCuorse = event.target.value;
    if (event.target.checked) {
      setCuorseSelectedList([...cuorseSelectedList, newCuorse])
      courses?.map((cuorse) => {
        let vahed = cuorse.vahed;
        if (cuorse.name == newCuorse) {
          setSumVahed((prev) => prev + vahed)
        }
      })
    } else {
      setCuorseSelectedList(cuorseSelectedList.filter(item => item !== event.target.value))
      courses?.map((cuorse) => {
        let vahed = cuorse.vahed;
        if (cuorse.name == newCuorse) {
          setSumVahed((prev) => prev - vahed)
        }
      })
    }
  }


  function vahedHandler() {
    if (sumVahed > 20) {
      alert("جمع واحد های انتخابی بیشتر از 20 واحد است")
    } else {
      console.log(studentObject);
      console.log(studentId);

      const newStudent = {
        "name":studentObject.name ,
        "last_name": studentObject.last_name,
        "student_number": studentObject.student_number,
        "field_of_study": studentObject.field_of_study,
        "img": studentObject.img,
        "cours_list": cuorseSelectedList,
        "id": studentObject.id
      }
      console.log(newStudent)
      courseUpdate({ url:'students', id: studentId, student: newStudent});
      alert("انتخاب واحد با موفقیت انجام شد")
    }
  }

  function findCuorseVahed(inst) {
    var vahed = 0;
    courses?.map((course) => {
      if (inst == course.name) {
        vahed = course.vahed;
      }
    })
    return vahed;
  }

  function handlerSelect(event) {
    students?.map((student) => {
      if (student.id == event.target.value) {
        setStudentObject(student)
        setFullName(handlerName(student));
        setfieldOfStudy(student.field_of_study);
        setStudentId(student.id)
      }
    })
  }

  function handlerName(student) {
    return `${student.name} ${student.last_name}`
  }

  return (

    <div className='ChoiseCourse'>
      <div>
        <div>
          <h1>student : {fullname}</h1>
          <h3>List of courses ({fieldOfStudy}) </h3>
        </div>
        <select
          name=""
          id="Field_of_study"
          onChange={handlerSelect}>
          <option value="" disabled selected hidden>select student</option>
          {
            students?.map((student) => (
              <option key={student.id} value={student.id} >{student.name} {student.last_name}</option>
            ))
          }
        </select>
      </div>
      <div>
        <table>
          <thead>
            <th id='number_sort'></th>
            <th>instructor</th>
            <th>field of study</th>
            <th>cours list</th>
            <th>vahed</th>
          </thead>
          <tbody>
            <tr>
            </tr>
            {instructors?.map(({ name, last_name, field_of_study, cours_list, id, img }) => (
              (() => {
                if (field_of_study == fieldOfStudy) {
                  return <>
                    <tr>
                      <td><img src={img} alt="" /></td>
                      <td>{name} {last_name}</td>
                      <td>{field_of_study}</td>

                      <td>
                        <div>
                          <ul>
                            {cours_list.map((inst) => (
                              <div key={inst.cours_id}>
                                <input id={inst} type="checkbox" value={inst} onClick={findCuorse} />
                                <label for={inst}>{inst}</label>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </td>
                      <td>
                        {cours_list?.map((inst) => (
                          <p>{findCuorseVahed(inst)}</p>
                        )
                        )}
                      </td>
                    </tr>
                  </>;
                }
              })()
            ))}
          </tbody>
        </table>
        <div>
          <div>
            <div>
              jame vahed : {sumVahed}
            </div>
            <div>
              <button onClick={vahedHandler}>done</button>
            </div>
          </div>
          {cuorseSelectedList?.map((item, index) => (

            <div key={index}>
              <li>{item}</li>
            </div>
          ))}
        </div>
      </div>
    </div>

  )

}

export default ChoiseCourse