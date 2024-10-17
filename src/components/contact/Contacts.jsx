import react from 'react'
import { CurrentLine, Orange, Pink } from '../../helpers/color';
import Contact from './Contact';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContactContext } from '../../Context/contactContext';
const Contacts = () => {
    const { contacts, loading, deleteContact } = useContext(ContactContext);
    console.log("contacts : -------------------");
    console.log(contacts);
    return (
        <>

            <section className='container'>
                <div className='grid'>
                    <div className='row'>
                        <div className='col'>
                            <p className='h3'>
                                <Link to={"/contacts/add"} className='btn mx-2' style={{ backgroundColor: Pink }}>
                                    مخاطب جدید
                                    <i className='fa fa-plus-circle mx-2'></i>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {loading ? <Spinner /> : (

                <section className='container'>
                    <div className='row'>
                        {


                            contacts.length > 0 ? contacts.map(c => (
                                <Contact key={c.id} Contact={c} confirmDelete={() => {
                                    deleteContact(c.id, c.fullName)
                                }} />

                            )) :
                                (
                                    <div className='text-center py-5' style={{ backgroundColor: CurrentLine }}>
                                        <p className='h3' style={{ color: Orange }}>مخاطب یافت نشد</p>
                                        <img src={require('../../assets/no-found.gif')} alt="" className='w-25' />
                                    </div>
                                )
                        }


                    </div>
                </section>
            )}

        </>
    );
};

export default Contacts;