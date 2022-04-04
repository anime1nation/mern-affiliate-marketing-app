import { connect } from 'react-redux';
import {slide as Menu} from 'react-burger-menu';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {store } from '../../store';
import {action as toggleMenu} from 'redux-burger-menu';
import { Link } from 'react-router-dom';
const AdminSidebar = ({isOpen,logout}) => {

    
const onOpenHandle = () => {
    store.dispatch(toggleMenu(!isOpen,'admin'));
}
const onCloseHandler = () => {
    store.dispatch(toggleMenu(!isOpen,'admin'));
}



return(

    <Menu  isOpen={isOpen} onOpen={onOpenHandle} onClose={onCloseHandler}  customBurgerIcon={false}>
        <Link className="menu-item" to="/admin">User Info</Link>
        <Link className="menu-item" to="/admin/pending-wallet-request">Wallet Request</Link>
        <Link className="menu-item" to="/admin/daily-payout">Daily Payout Detail</Link>
        <Link className="menu-item" to="/admin/kyc-request"> Pending KYC Request </Link>
        <Link className='meni-item' to='/admin/grivances'>Grivances</Link>
        <Link className="menu-item" to="/admin/notice">Notice</Link>
        <Link className="menu-item" to="/admin/classess">Schedule Classes</Link>
        <Link className='menu-item' to='/admin/add-testimonial'>Add Testimonial </Link>
        <Link className="menu-item" to="#">< i className='fa fa-sign-out' > </i> Logout </Link>
        
    </Menu>    
);
}

const mapStateToProps = state => ({
    auth: state.auth,
    isOpen: state.burgerMenu.admin.isOpen});

export default connect(mapStateToProps,null)(reduxBurgerMenu(AdminSidebar,'admin'));