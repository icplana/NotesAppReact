import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="NotesAppReact/login" element ={ <LoginPage /> } />
        <Route path="NotesAppReact/register" element ={ <RegisterPage /> } />

        <Route path="NotesAppReact/*" element= { <Navigate to="NotesAppReact/auth/login" />} />
    </Routes>
  )
}
