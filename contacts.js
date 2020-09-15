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

let contacts = [
    new Contact('Alex', 'Kotov', 'alexko@in6k.com'),
    new Contact('Bohdan', 'Kovalchuk', 'bodiako@in6k.com')
]

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

contacts.forEach(appendContact);

const contactForm = document.forms['contact'];

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const contact = new Contact(Object.fromEntries(formData.entries()));
    contacts.push(contact);
    appendContact(contact);
    contactForm.reset();
})