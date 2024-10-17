import { useState, useEffect } from 'react';
import './App.css';
import { addContact, EditContact, Contact, Contacts, Navbar } from './components';
import { Routes, useNavigate } from 'react-router-dom';
import { Navigate, Route } from 'react-router';
import { CREATE_Contact, DELETE_Contact, GET_AllContact, GET_AllGroups } from './services/ContactServices';
import AddContact from './components/contact/AddContact';
import ViewContact from './components/contact/ViewContact';
import { confirmAlert } from 'react-confirm-alert'
import { Comment, CurrentLine, Foreground, Purple, Yellow } from './helpers/color';
import { ContactContext } from './Context/contactContext';

const App = () => {


  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: Contact_data } = await GET_AllContact();
        const { data: Groups_data } = await GET_AllGroups();
        setContacts(Contact_data);
        setGroups(Groups_data);
      } catch (error) {
        console.log("Error :----> " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(prevLoading => !prevLoading);
      const { status, data } = await CREATE_Contact(contact);


      if (status === 201) {
        const allContacts = [...contacts, data]
        setContacts(allContacts);
        setContact({});
        setLoading(prevLoading => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(prevLoading => !prevLoading);


    }
  };

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    });
  };


  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CurrentLine,
              border: `1px solid ${Purple}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: Yellow }}>پاک کردن مخاطب</h1>
            <p style={{ color: Foreground }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                deleteContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: Purple }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: Comment }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };


  const deleteContact = async (contactId) => {
    try {
      const allContact = [...contacts];
      const filterContact = contacts.filter(x => x.id !== contactId);
      setContacts(filterContact);
      const { status } = await DELETE_Contact(contactId);
      if (status !== 200) {
        const { data: contactData } = await GET_AllContact();
        setContacts(allContact);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contacts,
      setContact,
      contact,
      setContacts,
      groups,
      onContactChange,
      deleteContact: confirmDelete,
      createContact: createContactForm
    }}>

      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/contacts' />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/contacts/add' element={<AddContact />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
          <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>

  );
};

export default App;