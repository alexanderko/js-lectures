function createElement(tagOrFn, props, ...children) {
    let element;
    if (typeof tagOrFn === 'string') {
        element = document.createElement(tagOrFn);
        for(let attr in props) { 
            let value = props[attr];
            if (typeof value === 'function') {
                element[attr] = value;
            } else {
                element.setAttribute(attr, value);
            }
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
            contacts.length ? createElement('div', {class: 'contacts'},
                contacts.map(contact => createElement(Contact, {contact}))
            ) : createElement('p', {class: 'no-contacts'}, 'No contacts yet 😿')
        )
    );
}


const contactsEndpoint = 'http://localhost:3000/contacts';

function postContact(contact) {
    return fetch(contactsEndpoint, {
        method: 'POST', 
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    })
    .then(response => response.json())
}

class Component {
    setState(changes) {
        Object.assign(this.state, changes);
        this.markForUpdate();
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = { contacts: [] };
        this.createContact = this.createContact.bind(this);
    }

    componentDidMount() {
        fetch(contactsEndpoint)
            .then(response => response.json())
            .then(contacts => { this.setState({contacts}) });
    }

    createContact(contact) {
        const {contacts} = this.state;
        postContact(contact)
            .then(contact => this.setState({
                contacts: [...contacts, contact]
            }), alert);
    }

    render() {
        const { contacts } = this.state;
        return (
            createElement(Fragment, {}, 
                createElement(ContactList, { title: 'Contacts', contacts }),
                createElement(ContactList, { 
                    title: 'Favorites', 
                    contacts: contacts.filter(c => c.favorite) }
                ),
                createElement('aside', {}, 
                    createElement(ContactForm, {onsubmit: this.createContact})
                )
            )
        );
    }
}

function Fragment() {
    return document.createDocumentFragment();
}

const app = new App();
const root = document.getElementById('root');
root.appendChild(app.render());
app.componentDidMount();

app.markForUpdate = () => {
    root.innerHTML = '';
    root.appendChild(app.render());
}

function ContactForm(props) {
    const { onsubmit } = props;
    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const contact = Object.fromEntries(formData.entries());
        onsubmit(contact);
        event.target.reset();
    };
    return (
        createElement('form', { onsubmit: submitHandler },
            createElement('h1', {}, 'New Contact'),
            createElement('input', { type: 'text', name: 'firstName', placeholder: 'First name' }),
            createElement('input', { type: 'text', name: 'lastName', placeholder: 'Last name' }),
            createElement('input', { type: 'text', name: 'email', placeholder: 'Email' }),
            createElement('button', {type: 'submit'}, 'Add')
        )
    )
}
