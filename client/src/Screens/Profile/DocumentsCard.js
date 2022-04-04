import React,{useEffect, useState,Fragment, useRef} from 'react'
import './fileUploader.css';
import { Convert } from 'mongo-image-converter';
import axios from 'axios';
import { setAlert } from '../../action/alert';
import docribbon from '../../assets/image/docribbon.png';
import './doccard.css';
import loader from '../../assets/image/loader.gif';
import Alerts from '../../Components/Alerts';
import {connect} from 'react-redux';

const DocumentsCard = ({
    setAlert
}) => {

    const[formdata,setformData]=useState({
        aadharFrontImg:'',
        aadharBackImg:'',
        panImg:'',
        passbookImg:'',
    });
    
    const { aadharFrontImg,aadharBackImg,panImg,passbookImg } = formdata;

    const [isloading,setIsLoading] = useState(true);
    const[isDocsUploaded,setIsDocsUploaded] = useState(false);
    const onChange = async(e) => {
        
        let file = e.target.files[0];
        let imgName = e.target.name;
        //get file type and  set name of file
        let fileName = file.name;
        //get file size
        let fileSize = file.size;
        //get file extension
        let fileExtension = file.name.split('.').pop();
        //get file name without extension
        let fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
        //get file type
        const fileType = ['jpg','jpeg','png','gif'];
        if(fileType.indexOf(fileExtension) === -1){
            const ele = document.getElementById("namefile-"+imgName);
            ele.innerHTML = 'Not a valid file';
            ele.style.color = 'red';
            

        }else{

            try{
                
                const data = await Convert(file);
                
                setformData({
                    ...formdata,
                    [imgName]:data
                });
                const ele = document.getElementById("namefile-"+imgName);
                ele.innerHTML = fileName;
                ele.style.color = 'green';
            
            }catch(err){
                console.log(err.message);
                alert('Failed to upload file');
            }

            const ele = document.getElementById("namefile"+imgName);
            ele.innerHTML = fileName;
        }

    }

   const onDocSubmit = async(e) => {
        
        const body = JSON.stringify({
            aadharFrontImg,
            aadharBackImg,
            panImg,
            passbookImg
        });
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try{
            const res = await axios.post('/api/user/update-kyc-documents',body,config);
           
            setAlert('Documents uploaded successfully','success');
            getKycDocuments();
        }catch(err){
            const errors = err.response.data.errors;
        if(errors){
            console.log(errors);
            errors.forEach(error =>setAlert(error.msg,'danger'));
        }
        }
    }

    const getKycDocuments = async() => {
        try{
            const res = await axios.get('/api/user/kyc-documents-uploaded');
            
            const { aadharFrontImg, aadharBackImg, panImg, passbookImg } = res.data;
            
            
            
                if(res.data!==null){
                    if(res.data.aadharFrontImg && res.data.aadharBackImg && res.data.panImg && res.data.passbookImg){
                        setformData({
                            aadharFrontImg:res.data.aadharFrontImg,
                            aadharBackImg:res.data.aadharBackImg,
                            panImg:res.data.panImg,
                            passbookImg:res.data.passbookImg,
                        });
                        setIsDocsUploaded(true);
                    }
                }
            

            

            setIsLoading(false);
        } catch(err){
            console.log(err.message);

        }
    }
    let isMounted = useRef(false);
    useEffect(() => {
        isMounted=true;
        
        setTimeout(() => {
            if(isMounted)
        {
            getKycDocuments();
        }},1000);
        return () => {
            isMounted = false;
        }
    }, []);



    


  return (
      
    <div className='col-sm-12'>
        {
            isloading ?
            <div className='text-center'>
                <img src={loader} alt='loader' className='loader'/>
            </div>:
        
        <div className='card'>
            
            <div className='card-body'>

                <div className='col-sm-12'> 
                    <img src={docribbon} alt='docribbon' className='docribbon'/>
                </div>
               
                <div className='row'>
                    <div className='col-sm-3'>
                    <div className='col-sm-12 fileupload text-center'>
                            <p>Aadhar Front </p>
                            <div className="upload-btn-wrapper">
                                <button className="uploadbtn">Upload a file</button>
                                <input type={
                                    aadharFrontImg==='' ? 'file' : 'hidden'
                                }  name='aadharFrontImg' 
                                onChange={e=>onChange(e)}
                                 />
                                <p> {!aadharFrontImg ? null:'Addhar Front Uploaded' } </p>
                                <span id={`namefile-aadharFrontImg`}></span>
                                <p>{
                                    aadharFrontImg==='' ? null :
                                    <img src={aadharFrontImg} alt='aadharFrontImg' className='img-fluid' style={{
                                        width:'200px',
                                        height:'200px'
                                    }}/>
                                    } </p>
                            </div>
                    </div>
                    </div>  


                    <div className='col-sm-3'>
                    <div className='col-sm-12 fileupload text-center'>
                            <p>Aadhar Back Image</p>
                            <div className="upload-btn-wrapper">
                                <button className="uploadbtn">Upload a file</button>
                                <input type="file" name='aadharBackImg' onChange={e=>{
                                    onChange(e)
                                }} className={
                                    !aadharBackImg? null : 'd-none'
                                } />
                                <p>
                                    {!aadharBackImg ? null:'Addhar Back Uploaded' }
                                </p>
                                <span id={`namefile-aadharBackImg`}></span>
                                <p>
                                    {
                                        aadharBackImg==='' ? null : 
                                        <img src={aadharBackImg} alt='aadharBackImg' className='img-fluid' style={{
                                            width:'200px',
                                            height:'200px'
                                        }}/>
                                    }
                                </p>
                            </div>
                    </div>
                    </div>


                    <div className='col-sm-3'>
                    <div className='col-sm-12 fileupload text-center'>
                            <p>PAN </p>
                            <div className="upload-btn-wrapper">
                                <button className="uploadbtn">Upload a file</button>
                                <input type="file" name='panImg' onChange={e=>{
                                    onChange(e)
                                }} className={
                                    !panImg? null : 'd-none'
                                } />
                                <p> {
                                    !panImg ? null:'Pan Uploaded'} </p>
                                <span id={`namefile-panImg`}></span>
                                <p>
                                    {
                                        panImg==='' ? null :
                                        <img src={panImg} alt='panImg' className='img-fluid' style={{
                                            width:'200px',
                                            height:'200px'
                                        }}/>
                                    }
                         
                                </p>
                            </div>
                    </div>
                    </div>

                    <div className='col-sm-3'>
                    <div className='col-sm-12 fileupload text-center'>
                            <p>Passbook</p>
                            <div className="upload-btn-wrapper">
                                <button className="uploadbtn">Upload a file</button>
                                <input type="file" name='passbookImg' onChange={e=>{
                                    onChange(e)
                                }} className={
                                    !passbookImg? null : 'd-none'
                                } />
                                <p> { !passbookImg ? null:'Passbook Uploaded'} </p>
                                <span id={`namefile-passbookImg`}></span>
                                <p>
                                    {
                                        passbookImg==='' ? null :
                                        <img src={passbookImg} alt='passbookImg' className='img-fluid' style={{
                                            width:'200px',
                                            height:'200px'
                                        }}/>
                                    }
                                
                                </p>
                            </div>
                    </div>
                    </div>
                    
                     
                </div>
                <div className='row '> 
                    <div className='col-sm-6 text-center offset-3 mt-4 btn-box'>
                   {
                      isDocsUploaded  ?  <button className='btn  btn-block orange darken-1' style={{
                        color:'#ffffff',
                        fontSize:'20px',
                        fontWeight:'bold'

                    }} onClick={e=>{
                            onDocSubmit();
                    }} disabled={true} >Submit</button> : <button className='btn  btn-block orange darken-1' style={{
                        color:'#ffffff',
                        fontSize:'20px',
                        fontWeight:'bold'

                    }} onClick={e=>{
                            onDocSubmit();
                    }}  >Submit</button>
                   }
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-12 text-center'>
                        {
                            aadharFrontImg==='' || aadharBackImg==='' || panImg ==='' || passbookImg === '' ? <strong className='text-danger'>Note : Please upload only image file</strong> :<strong className='text-success'>You have uploaded the KYC documents</strong>
                        }
                    </div>   
                     
                </div>
            </div>
            <Alerts />  
        </div>

}  
    </div>
    
  )
}

export default connect(null,{setAlert})(DocumentsCard)