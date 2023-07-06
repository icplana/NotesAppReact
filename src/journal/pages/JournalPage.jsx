// import { Typography } from "@mui/material"
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal )

  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch( startNewNote() )
  }



  return (
    <JournalLayout>
      {/* <Typography component={'h1'} variant={'h1'}>JournalPage</Typography> */}
      {/* <Typographay es provinente de mui, el component indica que tipo que component se renderizara y el variant que aspecto visual tendra, por defecto ambos son <p> */}

      {/* <MailOutlineIcon /> */}
      {/* Para usar iconos creamos un elemento, el nombre del elemento esta fijado en funcion del icono y dee importarse, + info en docs */}
      {
        ( active !== null )
        ?<NoteView />
        :<NothingSelectedView />
      }

    
      <IconButton
        disabled = { isSaving }
        onClick={ onClickNewNote }
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />

      </IconButton>
    
    </JournalLayout>
  )
}
