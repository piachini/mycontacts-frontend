

// Funzione per creare un nuovo contatto attraverso una form
function createContactForm() {
    // Mostra una finestra modale o un modulo con una form per inserire i dettagli del contatto
    const name = prompt('Inserisci il Nome del contatto:');
    const email = prompt('Inserisci l\'Email del contatto:');
    const phone = prompt('Inserisci il Telefono del contatto:');

    // Chiama la funzione per creare un nuovo contatto
    createContact(name, email, phone);
}

// Funzione per creare un nuovo contatto
function createContact(name, email, phone) {

    const createContactEndpoint = 'http://localhost:5001/api/contacts';

    const data = {
        name: name,
        email: email,
        phone: phone
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    };

    fetch(createContactEndpoint, requestOptions)
        .then(response => response.json())
        .then(contact => {
            console.log('Contatto creato con successo:', contact);
            // Aggiorna la lista dei contatti dopo aver creato il nuovo contatto
            displayContacts();
        })
        .catch(error => {
            console.error('Errore durante la creazione del contatto:', error);
        });
}


// Funzione per richiedere l'elenco dei contatti dell'utente corrente
// (gestendo il token di autenticazione fornito dall'API di login)
function displayContacts() {
    const contactsEndpoint = 'http://localhost:5001/api/contacts';

    // Opzioni della richiesta
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    // Eseguire la richiesta
    fetch(contactsEndpoint, requestOptions)
    .then(response => response.json())
    .then(contacts => {
        console.log('Elenco dei contatti:', contacts);
        displayContactsList(contacts);
    })
    .catch(error => {
        console.error('Errore durante il recupero dell\'elenco dei contatti:', error);
    });
}

// Funzione per visualizzare l'elenco dei contatti sulla pagina
function displayContactsList(contacts) {
    document.getElementById('contactsList').style.display = 'block';
    const tableBody = document.getElementById('contactsTableBody');

    // Pulisci la tabella
    tableBody.innerHTML = '';

    // Popola la tabella con i dati dei contatti
    contacts.forEach(contact => {
        const row = tableBody.insertRow();
        const userIdCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const emailCell = row.insertCell(2);
        const phoneCell = row.insertCell(3);

        userIdCell.innerText = contact.user_id;
        nameCell.innerText = contact.name;
        emailCell.innerText = contact.email;
        phoneCell.innerText = contact.phone;
    });
}



// Funzione per cercare contatti tramite email
function searchContactsByEmail() {
    const searchEmail = document.getElementById('searchEmail').value;
    const searchContactsEndpoint = `http://localhost:5001/api/contacts/?email=${searchEmail}`;

    // Opzioni della richiesta
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    // Eseguire la richiesta
    fetch(searchContactsEndpoint, requestOptions)
    .then(response => response.json())
    .then(contacts => {
        console.log('Elenco dei contatti:', contacts);
        displayContactsList(contacts);
    })
    .catch(error => {
        console.error('Errore durante il recupero dell\'elenco dei contatti:', error);
    });
}
