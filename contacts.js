function createElement(tagOrFn, props, ...children) {
    let element;
    if (typeof tagOrFn === 'string') {
        element = document.createElement(tagOrFn);
        for(let attr in props) { 
            element.setAttribute(attr, props[attr]);
        }
    } else {
        element = tagOrFn(props);
    }

    for (let child of children) {
        if (child === null) continue;
        if (Array.isArray(child)) {
            element.append(...child);
        } else {
            element.append(child);
        }
    }

    return element;
}

function Contact(props) {
    const { firstName, lastName, email} = props.contact;
    return createElement('p', {},
        `${firstName} ${lastName}`,
        email && email.length ? createElement(EmailLink, {email}) : null
    );
}

function EmailLink({ email }) {
    return createElement('a', { href: `mailto:${email}` }, `<${email}>`);
}

function ContactList(props) {
    const { title, contacts } = props;
    return (
        createElement('section', {}, 
            createElement('h1', {}, 
                title,
                createElement('span', {}, `${contacts.length}`)
            ),
            createElement('div', {class: 'contacts'},
                contacts.map(contact => createElement(Contact, {contact}))
            )
        )
    );
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
