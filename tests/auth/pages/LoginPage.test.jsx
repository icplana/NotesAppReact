import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSignIn = jest.fn()
const mockStartEmailSignIn = jest.fn()

jest.mock("../../../src/store/auth/thunks", () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startEmailSignIn: ( email, password ) => {
        return () => mockStartEmailSignIn( email, password )
    }
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => ( fn ) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})


describe('Pruebas en el LoginPage', () => {
    
   beforeEach( () => jest.clearAllMocks() )

   

    
    test('debe de renderizar el componente', () => {
       
        render(
            
            <Provider store = { store } > // aqui podriamos poner el store usado por el navegador pero para un mayor control creamos otro para el testing
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        // screen.debug()

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual( 1 )
    });

    test('boton de google debe llamar al startGoogleSignIn', async () => {
        
        //simular click boton
        // console.log(store.getState())
        render(            
            <Provider store = { store } > 
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )
    

        // screen.debug()
       
        const googleBtn = screen.getByLabelText( 'google-btn' )
        fireEvent.click( googleBtn )    

       

        //comprovar que se llama dispatch( startGoogleSignIn() ), no comprovaremos el funcionamiento del startGoogleSignIn pues eso corresponde el test de los thunks

        expect( mockStartGoogleSignIn ).toHaveBeenCalled()

    });

    test('submit debe llamar startEmailSignIn con los valores que correctos', () => {
        
        const email = 'fernando@google.com'
        const password = '123456'

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole( 'textbox',{ name: 'Correo'})
        fireEvent.change( emailField, { target: { name: 'email', value: email }})



        const passwordField = screen.getByTestId( 'password' )
        fireEvent.change( passwordField, { target: { name: 'password', value: password }})

        
        const loginForm = screen.getByLabelText('submit-form')
        fireEvent.submit( loginForm )


        expect( mockStartEmailSignIn ).toHaveBeenCalledWith( email, password )
    });

 })