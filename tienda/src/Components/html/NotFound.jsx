import { FaRobot } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
        <h1 style={{ fontSize:"4rem" }} >
            NOT FOUND 404
        </h1>
        <h1>
        <FaRobot color='#000' size="4rem" />
        </h1>
    </div>
  )
}

export default NotFound
