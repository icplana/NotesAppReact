import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        
        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        // const credentials = GoogleAuthProvider.credentialFromResult( result ) 
        const { displayName, email, photoURL, uid } = result.user
    

        return {
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }


    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);


        return {
            ok: false,
            errorMessage
        }
    }
}

export const signInWithEmail = async ( userEmail, userPassword ) => {
    try {
        

        const result = await signInWithEmailAndPassword( FirebaseAuth, userEmail, userPassword )
        const { displayName, email, photoURL, uid } = result.user
    
        console.log('logged in!')
        return {
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
     


        return {
            ok: false,
            errorMessage, errorCode, email 
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
      
       const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
       const { uid, photoURL } = resp.user 
       
       //Pendiente de actualizar displayName en Firebase
       updateProfile( FirebaseAuth.currentUser,{
           displayName,
           photoURL:'testing'
        }) 
        
        console.log(resp)


       return {
         ok: true,
         uid, photoURL, email, displayName
       }


    } catch (error) {
        console.log(error)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {

    return await FirebaseAuth.signOut()
}