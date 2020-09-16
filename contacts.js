function Contact(props) {
    const { firstName, lastName, email} = props.contact;
    const contactElement = document.createElement('p');
    contactElement.innerText = `${firstName} ${lastName}`;
    if (email && email.length) {
        contactElement.innerHTML += `<a href="mailto:${email}">&lt;${email}&gt;</a>`;
    }
    return contactElement;
}

function ContactList(props) {
    const { title, contacts } = props;
    const root = document.createElement('section');
    root.innerHTML = `<h1>${title} <span>(${contacts.length})</span></h1>`
    const list = document.createElement('div')
    list.setAttribute('class', 'contacts');
    contacts
        .map(contact => Contact({contact}))
        .forEach(node => list.appendChild(node));
    root.appendChild(list);
    return root;
}

const contactForm = document.forms['contact'];

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const contact = Object.fromEntries(formData.entries());
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
    .then(contacts => {
        const lists = [
            ContactList({
                title: 'Contacts',
                contacts
            }),
            ContactList({
                title: 'Favorites',
                contacts: contacts.filter(c => c.favorite)
            })
        ]
        document.body.prepend(...lists);
    });
