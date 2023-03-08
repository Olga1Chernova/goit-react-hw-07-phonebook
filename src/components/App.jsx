import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { setFilter } from 'redux/filter/filter-slice';
import { getFilter } from 'redux/filter/filter-selectors';

import { getFilteredContacts } from 'redux/contacts/contacts-selectors';
import { fetchAllContacts, fetchAddContact, fetchDeleteContact } from 'redux/contacts/contacts-operations';

import styles from './common.module.scss';

const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts())
  }, [dispatch])
  

  const onAddContact = ({ name, number }) => {
    const action = fetchAddContact({ name, number });
    dispatch(action);
  }

  const onDeleteContact = id => {
    const action = fetchDeleteContact(id);
    dispatch(action)
  }

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm  onSubmit={onAddContact}/>
      <h2 className={styles.title}>Contacts</h2>
      <Filter value={filter} handleChange={handleFilter} />
      <ContactList contacts={filteredContacts} deleteContact={onDeleteContact} />
    </div>
  );

}

export default App;

