import { useState, useEffect } from 'react'
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from 'yup';
import classes from './BonusDetail.module.css'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import axios from "axios";



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const onSubmit = (data) => {
    
  console.log(data);
}

const initialValues = {
  name: "",
  termCondition: "",
  details: "",
  redirectUrl: "",
}

const validate = (values) => {

  const errors = {}

  if (!values.cc) {
    errors.name = 'this field is required';
  }
  if (!values.termCondition) {
    errors.termCondition = 'this field is required';
  }
  if (!values.details) {
    errors.details = 'this field is required';
  }
  if (!values.redirectUrl) {
    errors.redirectUrl = 'this field is required';
  }

  return errors;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Campaign Name is required'),
  termCondition: Yup.string().required('Terms & Condition is required'),
  details: Yup.string().required('Details is required'),
  redirectUrl: Yup.string().required('RedirectUrl is required'),
})

const DataPost = () => {
  //get data form API
  const [bonusDetails, setBonusDetails] = useState([])
    useEffect(()=> {
      
        const cancelToken = axios.CancelToken.source()
        
            const fetchData = async()=>{             
              try {
                const {data} = await axios.post('http://localhost:1337/api/rummyplays',{cancelToken:cancelToken.token})
                setBonusDetails(data.data)
                console.log(data.data);
                console.log(formik.initialValues)
              formik.initialValues.name = data.data['campain_name']
              } catch (error) {
                console.log(error)
              }
            }

            fetchData();

            return ()=>{
              // clearing the network request on unmounting
              cancelToken.cancel()

            }
            
    },[])
  

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema
  })

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
            //value={bonusDetails[''] formik.values.name}
            value={ bonusDetails.length>0 ? bonusDetails[0].attributes['campain_name']:formik.values.name}
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
            //value={formik.values.termCondition}
            value = {bonusDetails.length>0 ? bonusDetails[0].attributes['terms_and_conditions']:formik.values.termCondition}
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
            //value={formik.values.details}
            value = {bonusDetails.length>0 ? bonusDetails[0].attributes['Details']:formik.values.details}
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
            //value={formik.values.redirectUrl}
            value = {bonusDetails.length>0 ? bonusDetails[0].attributes['Redirection_url']:formik.values.redirectUrl}
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
      </form>
      
      
    </div>
  )
}

export default DataPost

