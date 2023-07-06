import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, creatingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks', () => { 

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach( () => jest.clearAllMocks() )

    test('startNewNote debe de crear una nueva nota en blanco', async () => {
        
        const uid = 'TEST_UID'
        getState.mockReturnValue({ auth: { uid }})

        await startNewNote()( dispatch, getState )

        expect( dispatch ).toHaveBeenCalledWith( creatingNewNote() ) 
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number )
        }) ) 
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number )
        }) ) 

        // borrar todas la entradas de firebase - atencion este tipo de acciones solo se usan en testing cuando la bbdd es distinta a la produccion


        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` )
        const docs = await getDocs( collectionRef )
        
        const deletePromises = []
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) )

        await Promise.all( deletePromises )

    }); 
 }) 