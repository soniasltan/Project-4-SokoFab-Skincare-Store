import * as React from "react"
import {useState, useEffect} from "react"
import { baseURL } from "../axiosCtrl"
import axios from "axios"
import { AccountType } from "./Types"


const MyAccount = () => {
    const [status, setStatus] = useState<string>("idle");
    const [account, setAccount] = useState<AccountType>()
    const token = localStorage.getItem("access_token")

    useEffect(() => {
		const fetchAccountDetails = async () => {
            setStatus("pending")
            const res = await axios({
            method: 'get',
            url: baseURL+"/user/account/",
            headers: {"Authorization": "Bearer " + token},
        })
        console.log(res)
        console.log(res.data)
        setStatus("resolved")
        setAccount(res.data)
        }
        fetchAccountDetails()
	}, [token]);

    return (
        <>
        <h1>Account Details</h1>
        {token === null ? "Please log in to view account details" 
        : status === "pending" ? "Loading account details..." 
        :
        <ul>
            <li>Username: {account?.username}</li>
            <li>Email: {account?.email}</li>
            <li>First Name: {account?.first_name}</li>
            <li>Last Name: {account?.last_name}</li>
        </ul>
        }
        </>
    )
}

export default MyAccount