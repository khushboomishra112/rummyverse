import { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import classes from './BonusDetail.module.css'
import { Checkbox, FormControlLabel } from '@mui/material';
// import axios from "axios";


// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const onSubmit = (data) => {
  console.log(data);
  let requestBody = {
    data:{
      "Details":data.details,
      "Redirection_url":data.redirectUrl,
      "campain_name":data.name,
      "terms_and_conditions":data.termCondition,
      "push_channel":"email"

    }
  }
  // if (!formik.values.name || !formik.values.details || !form.values.redirectUrl) {
  //   alert("Please fill out all fields");
  //   return alert("Form Submitted Successfully");
  // }
  // const cancelToken = axios.CancelToken.source()
        
  const postData = async()=>{             
    try { 
     await fetch('http://localhost:1337/api/rummyplays',{method:'POST',
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(requestBody)
    })
  
    } catch (error) {
      console.log(error)
    }
  }

  postData(); 
}

// const initialValues = {
//   name: "",
//   termCondition: "",
//   details: "",
//   redirectUrl: "",
// }

// const validate = (values) => {

//   const errors = {}

//   if (!values.cc) {
//     errors.name = 'this field is required';
//   }
//   if (!values.termCondition) {
//     errors.termCondition = 'this field is required';
//   }
//   if (!values.details) {
//     errors.details = 'this field is required';
//   }
//   if (!values.redirectUrl) {
//     errors.redirectUrl = 'this field is required';
//   }

//   return errors;
// }

const validationSchema = Yup.object({
  name: Yup.string().required('Campaign Name is required'),
  termCondition: Yup.string().required('Terms & Condition is required'),
  details: Yup.string().required('Details is required'),
  redirectUrl: Yup.string().required('RedirectUrl is required'),
})
const handleClick = () => {
  window.open("http://www.google.com");
};

const BonusDetails = () => {
  //get data form API
  const [bonusDetails] = useState([])

  const formik = useFormik({
    initialValues:{
      name: bonusDetails.length>0 ? bonusDetails[0].attributes['campain_name']:"",
      termCondition: "",
      details: "",
      redirectUrl: "",
    },
    onSubmit,
    // validate,
    validationSchema
  })


    // useEffect(()=> {
    //     const cancelToken = axios.CancelToken.source()

    //         const fetchData = async()=>{             
    //           try {
    //             const {data} = await axios.get('http://localhost:1337/api/rummyplays',{cancelToken:cancelToken.token})
    //             setBonusDetails(data.data)
    //             console.log(data.data);
    //             console.log(formik.initialValues)
    //           formik.initialValues.name = data.data[0].attributes['campain_name']
    //           formik.initialValues.details = data.data[0].attributes['Details']
    //           formik.initialValues.termCondition = data.data[0].attributes['terms_and_conditions']
    //           formik.initialValues.redirectUrl = data.data[0].attributes['Redirection_url']

    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }

    //         fetchData();

    //         return ()=>{
    //           // clearing the network request on unmounting
    //           cancelToken.cancel()

    //         }
            
    // },[])
  

  return (
    <div className={classes.formWrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes['form-control-inline']}>
          <label htmlFor="name">Campaign Name:</label>
          <input
            type="text"
            placeholder="September Dhamaka"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          ></input>
          {formik.touched.name && formik.errors.name ? <div className={classes['error-msg']}>{formik.errors.name}</div> : null}
        </div>

        <div className={classes['form-control-block']}>
        <label htmlFor="termCondition">Terms & Conditions:</label>
          <textarea
            type="textarea"
            placeholder="Enter Terms Conditions ........"
            id="termCondition"
            name="termCondition"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.termCondition}
          ></textarea>
          {formik.touched.termCondition && formik.errors.termCondition ? <div className={classes['error-msg']}>{formik.errors.termCondition}</div> : null}
        </div>

        <div className={classes['form-control-block']}>
          <label htmlFor="details">Details:</label>
          <textarea
            type="textarea"
            placeholder="Enter The Details ........"
            id="details"
            name="details"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
          ></textarea>
          {formik.touched.details && formik.errors.details ? <div className={classes['error-msg']}>{formik.errors.details}</div> : null}
        </div>

        <div className={classes['form-control-inline']}>
          <label htmlFor="name">Redirection Url:</label>
          <input
            type="text"
            placeholder="Redirect Url"
            id="redirectUrl"
            name="redirectUrl"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.redirectUrl}
          ></input>
          {formik.touched.redirectUrl && formik.errors.redirectUrl ? <div className={classes['error-msg']}>{formik.errors.redirectUrl}</div> : null}
        </div>

        <div className={classes['form-control-inline', 'form-control-checkBox']}>
          <label htmlFor="job">Push Channel:</label>
          <FormControlLabel control={<Checkbox />} label="SMS" />
          <FormControlLabel control={<Checkbox />} label="Email" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Push Notification" />
          <FormControlLabel control={<Checkbox />} label="In App Message" />
          <FormControlLabel control={<Checkbox />} label="Road Block" />
        </div>
        <button type="submit" className={classes['bonus_detail_btn']}>Save</button>
       
        <button onClick={handleClick} className={classes['bonus_detail_btnn']}>Cancel</button>
      </form>
      
      
    </div>
  )
}

export default BonusDetails
