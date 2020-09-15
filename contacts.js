class Contact {
    constructor(firstNameOrObject, lastName, email) {
        if (typeof firstNameOrObject === 'object') {
            Object.assign(this, firstNameOrObject);
        } else {
            this.firstName = firstNameOrObject;
            this.lastName = lastName;
            this.email = email;
        }
    }

    toString() {
        return `${this.firstName} ${this.lastName} <${this.email}>`;
    }
}

const contactListElement = document.getElementById('contacts')
function appendContact(contact) {
    const { firstName, lastName, email} = contact;
    const contactElement = document.createElement('p');
    contactElement.innerText = `${firstName} ${lastName}`;
    if (email && email.length) {
        contactElement.innerHTML += `<a href="mailto:${email}">&lt;${email}&gt;</a>`;
    }
    contactListElement.appendChild(contactElement);
}

const contactForm = document.forms['contact'];


contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const contact = new Contact(Object.fromEntries(formData.entries()));
    createContact(contact)
    .then(appendContact, alert)
    .then(_ => contactForm.reset())
})

const contactsEndpoint = 'http://localhost:3000/contacts';

function createContact(contact) {
    return fetch(contactsEndpoint, {
        method: 'POST', 
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    })
    .then(response => response.json())
}

fetch(contactsEndpoint)
    .then(response => response.json())
    .then(contacts => contacts.forEach(appendContact))
    .catch(handleError)

function handleError() {
    contactListElement.innerText = "Can't load contacts :(";
}