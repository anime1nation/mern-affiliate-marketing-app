import axios from 'axios';

const setAdminAuthToken = adminToken =>{
    if(adminToken){
        axios.defaults.headers.common['x-admin-token'] = adminToken;
    }else{
        delete axios.defaults.headers.common['x-admin-token'] ;
    }
}

export default setAdminAuthToken;