import { Purple } from "../../helpers/color"

const SearchNavbar = () => {
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" style={{ backgroundColor: Purple }}>
                <i className="fa fa-search"></i>
            </span>
            <input type="text" dir="rtl" className="form-control" placeholder="جستجوی مخاطب" />

        </div>
    )
}
export default SearchNavbar;