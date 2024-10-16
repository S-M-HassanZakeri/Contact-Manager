import SearchNavbar from "./contact/searchContact";
import { Purple, Background } from "../helpers/color"
const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expend-sm shadow-lg" style={{ backgroundColor: Background }}>
            <div className="container">
                <div className="row w-100 align-items-center justify-content-center">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fa fa-id-badge mx-2" style={{ color: Purple }}></i>

                            وب اپیکیشن مدیریت <span style={{ color: Purple }}>مخاطیین</span>
                        </div>
                    </div>
                    <div className="col">
                        <SearchNavbar />
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;