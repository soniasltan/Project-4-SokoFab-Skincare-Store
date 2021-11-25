import * as React from "react"
import {useEffect} from "react"
import {axiosInstance, CommonHeaderProperties} from "../axiosCtrl"
import {useNavigate} from "react-router-dom"

const Logout = () => {
    let navigate = useNavigate()

    useEffect(() => {
        const response = axiosInstance.post("user/logout/blacklist/", {refresh_token: localStorage.getItem("refresh_token"),})
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        (axiosInstance.defaults.headers as unknown as Record<string, CommonHeaderProperties>).common["Authorization"] = null;
        navigate("/login");
    })
    return (
        <>
        Logging out
        </>
    )
}

export default Logout