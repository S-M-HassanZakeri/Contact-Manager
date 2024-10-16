import { useState, useEffect } from 'react';
import './App.css';
import { addContact, EditContact, Contact, Contacts, Navbar } from './components';
import { Routes, useNavigate } from 'react-router-dom';
import { Navigate, Route } from 'react-router';
import { CREATE_Contact, GET_AllContact, GET_AllGroups } from './services/ContactServices';
import AddContact from './components/contact/AddContact';
import ViewContact from './components/contact/ViewContact';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullName: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    Groupe: ""
  });
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
  }, [forceRender]); // وابستگی به forceRender برای بارگذاری مجدد

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await CREATE_Contact(getContact);
      if (status === 201) {
        setContact({
          fullName: "",
          photo: "",
          mobile: "",
          email: "",
          job: "",
          Groupe: ""
        });
        navigate("/contacts");
        setForceRender(!forceRender);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: event.target.value
    });
    console.log(getContact);
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/contacts' />} />
        <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading} />} />
        <Route path='/contacts/add' element={
          <AddContact
            loading={loading}
            setContactInfo={setContactInfo}
            contact={getContact}
            groups={getGroups}
            createContactForm={createContactForm}
          />
        } />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;