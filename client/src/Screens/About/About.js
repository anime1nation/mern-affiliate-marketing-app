import React from 'react'
import artboard1 from '../../assets/image/artboard1.png'
import Artboard2 from '../../assets/image/Artboard2.png'
import Artboard3 from '../../assets/image/Artboard3.png'
import Artboard4 from '../../assets/image/Artboard4.png'
import Sidebar from '../../Components/Sidebar';
import {action as toggleMenu} from 'redux-burger-menu';
import { store } from '../../store';
import { connect } from 'react-redux';
import Footer from '../components/Footer'
const About = ({
    isOpen
}) => {

    const handleToggle = () => {
        store.dispatch(toggleMenu(!isOpen,'user'));
 }
  return (
   <div className='container-fluid' style={{
       padding:'0'
   }}>
       <Sidebar />
       <div className='row' style={{
           backgroundColor:'#F56812'

       }}>
       <div className='col-sm-12 mt-3 pc-icons'>
                    <ul className='d-flex flex-row-reverse '>
                    <li style={{listStyle:'none'}} className='mr-2'>
                            <a onClick={
                                handleToggle
                            } className='text-light'>
                               <i className='fa-solid fa-bars'></i> 
                            </a>
                        </li>
                       
                    </ul>

                    </div>
       </div>
       <div className='row'>
           <div className='col-sm-12'>
               <img src={artboard1} className='img-fluid'/>
           </div>
           <div className='col-sm-12'>
               <img src={Artboard2} className='img-fluid'/>
           </div>
           <div className='col-sm-12'>
               <img src={Artboard3} className='img-fluid'/>
           </div>
           <div className='col-sm-12'>
               <img src={Artboard4} className='img-fluid'/>
           </div>

       </div>
       <Footer />
   </div>
  )
}
const mapStateToProps = (state) => ({
    
    isOpen : state.burgerMenu.user.isOpen
});


export default connect(mapStateToProps,null)(About);