import { Link } from 'react-router-dom';
import { CurrentLine, Cyan, Orange, Pink, Purple, Red } from '../../helpers/color'
import viewContact from './ViewContact';
const Contact = ({ Contact }) => {
    return (
        <div className='col-md-6'>
            <div style={{ backgroundColor: CurrentLine }} className='card my-2'>
                <div className='card-body p-0'>
                    <div className='row align-items-center d-flex justify-content-around ps-4'>
                        <div className='col-md-4 col-sm-4'>
                            <img src={Contact.photo} alt=""
                                style={{ border: '1px solid', borderColor: Purple }}
                                className='img-fluid rounded' />
                        </div>
                        <div className='col-md-7 col-sm-7'>
                            <ul className='list-group p-0'>
                                <li className='list-group-item list-group-item-dark'>
                                    نام و نام خانوادگی
                                    <span className='fw-bold'>
                                        : {Contact.fullName}
                                    </span>
                                </li>

                                <li className='list-group-item list-group-item-dark'>
                                    شماره موبایل
                                    <span className='fw-bold'>
                                        :  {Contact.mobile}
                                    </span>
                                </li>

                                <li className='list-group-item list-group-item-dark'>
                                    آدرس ایمیل
                                    <span className='fw-bold'>
                                        :  {Contact.email}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-1 col-sm-1 flex-column align-items-center p-0'>
                            <Link to={`/Contacts/${Contact.id}`} className='btn my-1 w-100' style={{ backgroundColor: Orange }}>
                                <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={`Contacts/${Contact.id}`} className='btn my-1 w-100' style={{ backgroundColor: Cyan }}>
                                <i className='fa fa-edit'></i>


                            </Link>
                            <button className='btn my-1 w-100' style={{ backgroundColor: Red }}>
                                <i className='fa fa-remove '></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact;