import { createSlice } from '@reduxjs/toolkit'
import { startNewNote } from './thunks'

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
        // active: {
        //     id:'ABC123',
        //     title: '',
        //     body:'',
        //     date: 1234567,
        //     imgUrls: [], //array de urls de fotos
        // } //ejemplo de nota activa
    
   },
   reducers: {
        creatingNewNote: ( state, action ) => {
            state.isSaving = true
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload )
            state.isSaving = false
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload
            state.messageSaved = ''
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload.notes
        },
        setSaving: ( state, action ) => {
            state.messageSaved = ''
            state.isSaving = true
        },
        updateNote: ( state, action ) => {
            state.isSaving = false

            const modifiedNote = action.payload
            
            state.notes = state.notes.map( note => {
                if ( modifiedNote.id === note.id ) {
                   return modifiedNote
                }
                return note
            })

            state.messageSaved = `${ action.payload.title } actualizada correctamente`
        },
        setPhotosToActiveNote: ( state, action ) => {
            if ( state.active.imageUrls === undefined ) state.active.imageUrls = []
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ]
            state.isSaving = false
        },
        deleteNoteById: ( state, action ) => {
            state.notes = state.notes.filter( note => note.id !== action.payload )
            state.active = null
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false
            state.active = null
            state.notes = []
            state.messageSaved = ''
        },
        deleteImgByUrl: ( state, { payload } ) => {

            // modificamos la nota del state.active
            state.active = payload.newNote

            //modificamos la nota del array de notes
            state.notes = state.notes.map( note => {
                if ( note.id === payload.noteId ) return payload.newNote
                return note
            })

            state.isSaving = false  

        }
   },
})

export const {
  addNewEmptyNote,
  clearNotesLogout,
  creatingNewNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
  deleteImgByUrl
} = journalSlice.actions;