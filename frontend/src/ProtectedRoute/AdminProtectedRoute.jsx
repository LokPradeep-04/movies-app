import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import Loader from "../components/Loader"
import API_BASE_URL from "../config/config"

const AdminProtectedRoute = ({children})=>{
    const token = Cookies.get("accessToken")
    const [status, setStatus] = useState("loading")

    if(!token){
        return <Navigate to="/admin/login" replace />
    }
    useEffect(()=>{
        const checkAdmin = async ()=>{
            try {
                const reponse = await fetch(`${API_BASE_URL}/api/auth/profile`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await reponse.json()
                if (reponse.ok && data.user.role==="admin"){
                    setStatus("admin")
                }
                else{
                    setStatus("denied")
                }
            } catch (error) {
                setStatus("denied")
            }
        }
        checkAdmin()
    },[token])

    if (status === "loading") {
        return <Loader />
    }

    if (status === "denied") {
        return <Navigate to="/admin/login" replace />
    }

    return children
}

export default AdminProtectedRoute