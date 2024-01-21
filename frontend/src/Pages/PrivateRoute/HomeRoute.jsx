import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeRoute = () => {

    const { userInfo } = useSelector((store) => store.auth)

    return userInfo? <Outlet /> : <Navigate to="/login" replace/>
}

export default HomeRoute