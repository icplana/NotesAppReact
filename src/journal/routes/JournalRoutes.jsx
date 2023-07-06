import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"


export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="NotesAppReact/" element= { <JournalPage /> } />
        
        <Route path="NotesAppReact/*" element= { <Navigate to= "NotesAppReact//" /> } />

    </Routes>
  )
}
