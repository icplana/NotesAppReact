import { signInWithGoogle, registerUserWithEmailPassword, signInWithEmail, logoutFirebase } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { login, checkingCredentials, logout } from "./"

export const checkingAuthentication = ( email, password ) => {
    

    return async ( dispatch ) => {

        dispatch( checkingCredentials() )
        


    }
}

export const startGoogleSignIn = () => {


    return async ( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await signInWithGoogle()
        console.log({result})

        if ( !result.ok ) return dispatch( logout( { errorMessage: result.errorMessage } ) )

        dispatch( login( result ) )

        
    }
}

export const startEmailSignIn = ( email, password ) => {
    

    return async ( dispatch ) => {
         
        dispatch( checkingCredentials() )

        const result = await signInWithEmail( email, password )

        if ( !result.ok ) return dispatch( logout( { errorMessage: result.errorMessage } ) )

        dispatch( login( result ) )
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() )

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        if ( !ok ) return dispatch( logout( { errorMessage } ))

        dispatch( login( { uid, email, displayName, photoURL } ))

    }
}

export const LogOut = () => {

    return async ( dispatch ) => {
       
        await logoutFirebase()


        dispatch( clearNotesLogout() )
       

    }
}