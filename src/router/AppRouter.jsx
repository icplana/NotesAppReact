import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { useDispatch, useSelector } from "react-redux"
import { CheckingAuth } from "../ui/components"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth"
import { useCheckAuth } from "../hooks"


export const AppRouter = () => {

 const status = useCheckAuth()  


  if ( status === 'checking') {
    return <CheckingAuth />
  } 
  return (
    <Routes>


        {
          (status === 'authenticated') 
          ?<Route path="/*" element={ <JournalRoutes /> } />
          :<Route path="/auth/*" element={ <AuthRoutes />} />
        }

        <Route path="/*" element={ <Navigate to='/auth/login'/> } />
        
        {/* Login y registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes />} /> */}


        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}
