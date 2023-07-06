import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('pruebas en authSlice', () => { 
    
    test('debe de regresar elestado inicial i llamarse auth (el reducer)', () => {
        
        expect( authSlice.name ).toBe( 'auth' )

        expect( authSlice.reducer( initialState, {} ) ).toEqual( initialState )
    });

    test('debe realizar la autenticacion', () => {
        
        
        const state = authSlice.reducer( initialState, login( demoUser ) )
   
        expect( state ).toEqual( authenticatedState )

    });

    test('debe realizar logout', () => {

        const state = authSlice.reducer( initialState, logout() )
   
        expect( state ).toEqual( notAuthenticatedState )

    });

    test('debe de realizar el logout y mostrar un msj de error', () => {
        
        const errorMessage = 'Credenciales incorrectas'

        const state = authSlice.reducer( initialState, logout( {
            errorMessage: 'Credenciales incorrectas'
        }) )
   
        expect( errorMessage ).toEqual( state.errorMessage )
    });

    test('debe cambiar el estado a checking', () => {
       
        const state = authSlice.reducer( demoUser, checkingCredentials() )

        expect( state.status ).toBe('checking')

    });
 })