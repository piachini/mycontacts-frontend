
let token;

// Funzione per attivare la registrazione
function register() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    registerUser(username, email, password);
}

// Funzione per attivare il login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    loginUser(email, password);
}


// Funzione per esguire la registrazione
function registerUser(username, email, password) {
    const registerEndpoint = 'http://localhost:5001/api/users/register';

    // Dati da inviare al server
    const data = {
        username: username,
        email: email,
        password: password
    };

    // Opzioni della richiesta
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    // Eseguire la richiesta
    fetch(registerEndpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Registrazione avvenuta con successo:', data);
        })
        .catch(error => {
            console.error('Errore durante la registrazione:', error);
        });
}

// Funzione per eseguire il login
function loginUser(email, password) {
    const loginEndpoint = 'http://localhost:5001/api/users/login';

    // Dati da inviare al server
    const data = {
        email: email,
        password: password
    };

    // Opzioni della richiesta
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    // Eseguire la richiesta e visualizzare i dati dell'utente ed i suoi contatti
    fetch(loginEndpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Login avvenuto con successo:', data);
            token = data.accessToken;
            currentUser();
            // handleAuthentication(data);
            // fetchContactsList(data);
        })
        .catch(error => {
            console.error('Errore durante il login:', error);
        });
}

// Funzione per richiedere le informazioni dell'utente corrente
// (gestendo il token di autenticazione fornito dall'API di login)
// function handleAuthentication(data) {
function currentUser() {
    const currentEndpoint = 'http://localhost:5001/api/users/current';
    // const token = data.accessToken;

    // Opzioni della richiesta
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    // Eseguire la richiesta
    fetch(currentEndpoint, requestOptions)
        .then(response => response.json())
        .then(user => {
            console.log('Informazioni dell\'utente corrente:', user);
            displayUserInfo(user);
        })
        .catch(error => {
            console.error('Errore durante il recupero delle informazioni dell\'utente:', error);
        });
}

// Funzione per visualizzare le informazioni dell'utente sulla pagina
function displayUserInfo(user) {
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('userUsername').innerText = user.username;
    document.getElementById('userEmail').innerText = user.email;
    document.getElementById('userId').innerText = user.id;
}




// Esempio di utilizzo
// const username = 'nomeutente';
// const password = 'passwordsegreta';

// Registrazione
// registerUser(username, email, password);

// Login
// loginUser(email, password);
