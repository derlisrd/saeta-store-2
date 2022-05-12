import { useLogin } from "../../Contexts/LoginProvider"


const DashBoard = () => {
  const {logOut}= useLogin()
  return (
    <>
     <h1>DASHBOARD</h1> 
     <button onClick={logOut}>LOG OUT</button>
    </>
  )
}

export default DashBoard
