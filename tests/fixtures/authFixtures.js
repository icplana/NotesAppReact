export const initialState = {
    status: 'checking', //'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated', //'checking', 'not-authenticated', 'authenticated'
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo user',
    photoURL: 'https://foto.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser = {
    uid: 'ABC123',
    email: "demo@google.com",
    displayName: 'Demo user',
    photoURL: 'https://foto.jpg'
}