
import { logoutFirebase, registerUserWithEmailPassword, signInWithEmail, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { LogOut, checkingAuthentication, startCreatingUserWithEmailPassword, startEmailSignIn, startGoogleSignIn } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers")

describe('pruebas en auth thunks', () => {
    
    const dispatch = jest.fn()

    beforeEach( () =>  jest.clearAllMocks() )

    test('debe de invocar el checking credentials', async () => {
        
        
        await checkingAuthentication(  )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )

    });

    test('startGoogleSignIn debe de llamar checking credentials y login -exito', async () => {
        
        const loginData = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
    });

    test('startGoogleSignIn debe llamar checkingCredentials y logout-error', async () => {
        
        const loginData = { ok: false, errorMessage: 'error' }
        await signInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage: loginData.errorMessage }) )

    });

    test('signInWithEmail debe llamar al login con credenciales correctas - exito', async () => {

        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456'}

        await signInWithEmail.mockResolvedValue( loginData )

        await startEmailSignIn( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )

    });

    test('signInWithEmail debe llamar al logout con credenciales incorrectas - error', async () => {

        const loginData = { ok: false, errorMessage: 'error' }
        const formData = { email: demoUser.email, password: '123456'}

        await signInWithEmail.mockResolvedValue( loginData )

        await startEmailSignIn( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage: loginData.errorMessage }) )

    });

    test('startCreatingUserWithEmail debe llamar a checking credentials, register user y login (exito)', async () => {
            // const loginData = { ...demoUser }
            // const callData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName}

            // await registerUserWithEmailPassword.mockResolvedValue( { ...loginData, errorMessage: 'error' } )

            // await startCreatingUserWithEmailPassword( callData )( dispatch )

            // expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
            // expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
    });


    test('LogOut debe llamar al logoutFirebase y al dispatch clear notes', async () => {
        
        await LogOut()( dispatch )
        
        expect( logoutFirebase ).toHaveBeenCalled()
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() )
    });
});