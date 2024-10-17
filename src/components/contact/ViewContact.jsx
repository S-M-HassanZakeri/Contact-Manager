import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { ContactContext } from '../../Context/contactContext';
import { CurrentLine, Purple, Cyan } from '../../helpers/color';
import { GET_Group, GET_Contact } from '../../services/ContactServices';
import Spinner from '../Spinner';

const ViewContact = () => {
    const { loading, setLoading } = useContext(ContactContext)

    const { contactId } = useParams();

    const [state, setState] = useState({
        contact: {},
        group: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            try {
                setLoading(true)
                const { data: ContactData } = await GET_Contact(contactId);
                const { data: GroupData } = await GET_Group(ContactData.Groupe);
                setState({
                    contact: ContactData,
                    group: GroupData
                });
                setLoading(false)

            } catch (error) {
                console.log(error.message);
                setState(prevState => ({ ...prevState }));
                setLoading(prevLoading => !prevLoading)


            }
        };

        fetchData();
    }, [contactId]); // وابستگی به contactId

    const { contact, group } = state;

    return (
        <>
            <section className="view-contact-intro p3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{ color: Cyan }}>
                            اطلاعات مخاطب
                        </p>
                    </div>
                </div>
            </section>

            <hr style={{ backgroundColor: Cyan }} />

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {Object.keys(contact).length > 0 && (
                        <section className="view-contact mt-e">
                            <div
                                className="container p-2"
                                style={{ borderRadius: "1em", backgroundColor: CurrentLine }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={contact.photo}
                                            alt={contact.fullName}
                                            className="img-fluid rounded"
                                            style={{ border: `1px solid ${Purple}` }}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-dark">
                                                نام و نام خانوادگی :{" "}
                                                <span className="fw-bold">{contact.fullName}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                شماره موبایل :{" "}
                                                <span className="fw-bold">{contact.mobile}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                ایمیل : <span className="fw-bold">{contact.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                شغل : <span className="fw-bold">{contact.job}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                گروه : <span className="fw-bold">{group.name || 'گروه نامشخص'}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <Link
                                            to="/contacts"
                                            className="btn"
                                            style={{ backgroundColor: Purple }}
                                        >
                                            برگشت به صفحه اصلی
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
};

export default ViewContact;