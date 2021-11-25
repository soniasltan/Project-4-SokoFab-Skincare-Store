import * as React from "react"
import {useState, useEffect} from "react"
import {axiosInstance, CommonHeaderProperties} from "../axiosCtrl"
import {useNavigate} from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Logout = () => {
    let navigate = useNavigate()
    const [status, setStatus] = useState<string>("idle");

    useEffect(() => {
        setStatus("pending");
        axiosInstance.post("user/logout/blacklist/", {refresh_token: localStorage.getItem("refresh_token"),})
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        (axiosInstance.defaults.headers as unknown as Record<string, CommonHeaderProperties>).common["Authorization"] = null;
        setStatus("resolved");
        navigate("/login");
    }, [navigate])
    return (
        <>
        {status === "pending" ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={80} sx={{ margin: "25% auto" }} />
          </Box>
        ) : ( "" ) 
        }
        </>
    )
}

export default Logout