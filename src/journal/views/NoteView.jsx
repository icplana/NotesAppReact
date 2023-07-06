import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal"


export const NoteView = () => {

    const dispatch = useDispatch()

    const { active: note, messageSaved, isSaving } = useSelector( state => state.journal )

    const { body, title, date, onInputChange, formState} = useForm( note )

    const dateString = useMemo( () => {
        const newDate = new Date( date )
        return newDate.toUTCString()
    }, [ date ])

    const fileInputRef = useRef()

    useEffect( () =>{
        dispatch( setActiveNote( formState ) )
    }, [ formState ])


    useEffect( () => {
        if ( messageSaved.length > 0 ){
            Swal.fire( 'Nota actualizada', messageSaved , 'success' )
        }
    }, [ messageSaved ])

    const onSaveNote = () => {
        dispatch( startSavingNote() )
    }


    const onFileInputChange = ({ target }) =>  {
        if ( target.files === 0 ) return

       dispatch( startUploadingFiles( target.files ) )

    }

    const onDelete = () => {
        dispatch( startDeletingNote() )
    }

  return (
    <Grid
        className="animate__animated animate__fadeIn animate__faster" 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb:1 }}
    >

        <Grid item >
            <Typography fontSize={ 39 } fontWeight='light' >
                { dateString }
            </Typography>
        </Grid>

        <Grid item>

            <input
                ref = { fileInputRef } 
                type="file" 
                multiple
                onChange={ onFileInputChange }
                style={{ display: 'none'}}
            />

            <IconButton
                color="primary"
                disabled = { isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined/>
            </IconButton>


            <Button
                disabled = { isSaving }
                onClick={ onSaveNote } 
                color="primary" 
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label= 'Título'
                sx={{ border:'none', mb:1 }}
                name = "title"
                value={ title }
                onChange={ onInputChange }
            />   
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedio hoy?"
                minRows={ 5 }
                name = "body"
                value={ body }
                onChange={ onInputChange }
            />   
        </Grid>

        <Grid container justifyContent="end">
            <Button
                onClick={ onDelete }
                sx={{ mt:2 }}
                color="error"
            >
                <DeleteOutline/>
                Borrar
            </Button>
        </Grid>

        <ImageGallery images = { note.imageUrls } />

    </Grid>
  )
}