import React from 'react'
import '../style/Style.scss'
import { Routes, Route } from 'react-router-dom'
import Students from './Students'
import Courses from './Courses'
import Instructors from './Instructors'
import ChoiseCourse from './ChoiseCourse'
import Welcome from './Welcome'




const MainBox = () => {
    return (
        <div className='container'>
            <div>
                <Routes>
                    <Route path='/' element={<Welcome />}></Route>
                    <Route path='/Students' element={<Students />}></Route>
                    <Route path='/Courses' element={<Courses />}></Route>
                    <Route path='/Instructors' element={<Instructors />}></Route>
                    <Route path='/ChoiseCourse' element={<ChoiseCourse />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default MainBox