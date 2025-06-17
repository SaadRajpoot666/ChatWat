import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export const AdminUserTable = ()=>{
    const {user} = useContext(UserContext)

    return <h1>user</h1>


}