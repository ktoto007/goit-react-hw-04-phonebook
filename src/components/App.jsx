import React, { useState } from 'react';
import { FormContaks } from './form/FormContaks';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = values => {
    setContacts(state => {
      console.log(state);
      if (
        state.some(
          ({ name }) => name.toLowerCase() === values.name.toLowerCase()
        )
      ) {
        alert(`${values.name} is already in contacts`);
        return [...state];
      } else {
        return [...state, values];
      }
    });
  };

  const filtredParam = e => {
    setFilter(e.target.value);
  };

  const onFilterContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = e => {
    setContacts(state => {
      return state.filter(contact => contact.id !== e.target.id);
    });
  };
  return (
    <>
      <h2>Phonebook</h2>
      <FormContaks addContact={addContact} />

      <h2>Contacts</h2>
      <Filter filtredParam={filtredParam} />
      <ContactList contacts={onFilterContact()} deleteContact={deleteContact} />
    </>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts.length !== this.state.contacts.length) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

// addContact = values => {
//   this.setState(prevState => {
//     if (
//       prevState.contacts.some(
//         ({ name }) => name.toLowerCase() === values.name.toLowerCase()
//       )
//     ) {
//       alert(`${values.name} is already in contacts`);
//       return { contacts: [...prevState.contacts] };
//     } else {
//       return { contacts: [...prevState.contacts, values] };
//     }
//   });
// };

//   filtredParam = e => {
//     this.setState({
//       filter: e.target.value,
//     });
//   };

//   onFilterContact = (contacts, param) => {
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(param.toLowerCase())
//     );
//   };

//   deleteContact = e => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(
//           contact => contact.id !== e.target.id
//         ),
//       };
//     });
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const filtredContacts = this.onFilterContact(contacts, filter);
//     return (
//       <>
//         <h2>Phonebook</h2>
//         <FormContaks addContact={this.addContact} />

//         <h2>Contacts</h2>
//         <Filter filtredParam={this.filtredParam} />
//         <ContactList
//           contacts={filtredContacts}
//           deleteContact={this.deleteContact}
//         />
//       </>
//     );
//   }
// }
