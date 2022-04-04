import React,{Fragment,useState,useEffect,useRef} from 'react';
import TestimonialSingleCard from './TestimonialSingleCard';
import axios from 'axios';

const TestimonialCardGroup = () => {
    const [testimonials,setTestimonials] = useState([]);
const [loading,setLoading] = useState(true);

const fetchData = async () => {
    try{
        const res = await axios.get('/api/user/testimonials');
        console.log(res.data)
        setTestimonials(res.data);
        setLoading(false);
        console.log(res.data)
    }catch(err){
        console.error(err.message);
    }
}

let isMounted = useRef(false);
useEffect(() => {
    isMounted=true;

    if(isMounted){
        fetchData();
    }

    
    return () => {
       isMounted=false
    }
}, []);




    return(
        <Fragment>
           
         {
                testimonials.map(testimonial=>(
                    <div className='col-sm-3' key={testimonial._id}>
                        <TestimonialSingleCard img={testimonial.avatar} name={ testimonial.name } message={testimonial.msg}/>
                    </div>))

          }
          </Fragment>
        
      
              
    );

}

export default TestimonialCardGroup;
