import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../style/Style.scss'


const Header = () => {
    return (
        <>
            <div className='header'>
                <div>
                    <h1><i className="fa-solid fa-crown"></i> Grand College</h1>
                </div>
                <div>
                    <div>
                        <Link to="">
                            Home
                        </Link>
                    </div>
                    <div>
                        <Link to="Students">
                            Students
                        </Link>
                    </div>
                    <div>
                        <Link to="Courses">
                            Courses
                        </Link>
                    </div>
                    <div>
                        <Link to="Instructors">
                            Instructors
                        </Link>
                    </div>
                    <div>
                        <Link to="ChoiseCourse">
                            ChoiseCourse
                        </Link>
                    </div>
                    {< Outlet />}
                </div>
            </div>
        </>

    )
}

export default Header