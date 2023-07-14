import React, { useEffect, useState } from 'react'
import { unstable_useBlocker, useNavigate, Navigate } from 'react-router-dom'
import { UserDetails } from '../services/Api'
import Nav from '../component/Nav'
import { logout, isAuthenticated } from '../services/Auth'

function Dashbord() {

    const navigate = useNavigate();

    const [user, setUser] = useState({ name: "", email: "", localId: "" })

    useEffect(() => {
        if (isAuthenticated()) {
            UserDetails().then((response) => {
                setUser({
                    name: response.data.users[0].displayName,
                    email: response.data.users[0].email,
                    localId: response.data.users[0].localId


                })
            })
        }
    }, [])

    const logoutUser = () => {
        logout();
        navigate('/login')
    }
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Nav logoutUser={logoutUser} />
            <main role="main" class="container mt-5">
                <div class="container">
                    <div class="text-center mt-5">
                        <h3>Dashboard page</h3>
                        {user.name && user.email && user.localId ?
                            (<div>
                                <p class="text-bold " >Hi {user.name} user, your Firebase ID is {user.localId}</p>
                                <p>Your Email is {user.email}</p>
                            </div>)
                            : <p>Loding....</p>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashbord
