import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"




export const loadNotes = async ( uid = '' ) => {

    if ( !uid ) throw new Error('uid incorrecto')


    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`) //identificamos coleccion
    const docs = await getDocs( collectionRef ) //traemos colleccion (en este punto la funcion getDocs tiene varios parametros y podemos aplicar filtros para obtener resultado acotados)

    const notes = []
    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() })
    })

    return notes
}