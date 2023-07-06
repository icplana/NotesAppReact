import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, setActiveNote,creatingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById, deleteImgByUrl } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers"



export const startNewNote = () => {

    return async ( dispatch, getState ) => {

        dispatch( creatingNewNote() )

        const { uid } = getState().auth

        // necesitamos uid

        const newNote = {
            title:'',
            body: '',
            date: new Date().getTime(),
        }

        
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )
        const setDocResp = await setDoc( newDoc, newNote )

        newNote.id = newDoc.id



      

        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )
       
        // dispatch (activar nota)




    }
}


export const startLoadingNotes = () => {

    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const notes = await loadNotes( uid )

        dispatch( setNotes( { notes } ) )
        
    
        
    }
}


export const startSettingActiveNote = ( note ) => {

    
    return async ( dispatch ) => {
        dispatch( setActiveNote( note ) )
    }
}


export const startSavingNote = () => {
    return async ( dispatch, getState ) => {

        //ponemos el state en isSaving true
        dispatch( setSaving() )
        

        //modificamos la BD
        const { uid } = getState().auth
        const { active:note } = getState().journal
        
        const noteToFireStore = { ...note }
        delete noteToFireStore.id
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        await setDoc( docRef, noteToFireStore, { merge: true } )

        //modificamos el state a issaving false y modificamos la note del state sin recurrer a un call a la BD para optimitzar
        dispatch( updateNote( note ) )
    }
}


export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch ) => {
        dispatch ( setSaving() )


        // await fileUpload ( files[0] )

        const fileUploadPromises = []
        for (const file of files ) {
            fileUploadPromises.push( fileUpload ( file ))
        } // con el ciclo for creamos un array de promesas o "funciones pendientes de llamar" (en este caso debido al retorno de la funcion llamada son promesas)

        // como no se llaman en el acto dentro del ciclo no se ejecutan en secuencia, simplemente se almacenan en un array, luego con el Promise.all podemos lanzarlas todas en paralelo y optimizar el tiempo de respuesta.

       const photosUrls = await Promise.all( fileUploadPromises )


       dispatch( setPhotosToActiveNote( photosUrls ) )
    }
}


export const startDeletingNote = () => {

    return async ( dispatch, getState ) => {
         
        //identificamos user y nota en firebase
        const { uid } = getState().auth
        const { active: note } = getState().journal

        // eliminas de firebase
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        await deleteDoc( docRef )
        


        //eliminamos del store
        dispatch( deleteNoteById( note.id ) )

    }
}


export const startDeletingImg = ( url ) => {

    return async ( dispatch, getState ) => {

        //identificar nota 
        const { uid } = getState().auth
        const { active: note } = getState().journal
        
        //modificar la nota
        const newNote = { ...note }
        newNote.imageUrls = note.imageUrls.filter( URL => URL !== url )

        //aplicar el cambio en firebase
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        await setDoc( docRef, newNote, { merge: true })

        //isSaving: true        
        dispatch( creatingNewNote() )

        //modificar la nota tanto en el state ( active + array notes) + isSaving: false
        dispatch( deleteImgByUrl( { newNote, noteId: note.id } ) )
    }
}