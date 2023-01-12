import React, { useState, useEffect } from "react";
import "./Form.scss";
import axios from 'axios'
import Comment from "../components/comment";


const Form = () => {
  const intialValues = { email: "", name: "", comment: "" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('')
  const [name, setname] = useState('')
  const [website, setwebsite] = useState('')
  const [comment, setComment] = useState('')
  const [dataFetch, setdataFetch] = useState([])
  const [result, setResult] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [offsetdataValue,setoffsetdataValue] = useState(0)
  const[responseMetaData,setresponseMetaData]= useState(0)

  const [message, setMessage] = useState('')
  const submit = async () => {
    console.log(formValues);

    const dataRequest = {
      "name": name,
      "email": email,
      "website": website,
      "comment": comment,

    }
    try {

      let dataRespose = await axios.post('http://localhost:1337/api/commentsections', { data: dataRequest })
      //console.log("json" + JSON.stringify(dataRespose))
      setResult(dataRespose)
      ShowComments()



      return dataRespose

    } catch (error) {
      console.log(error)
    }



  };

const handlePaginate = (arg)=>{
  console.log(arg)
  

   if(arg === 'prev'){
      setCurrentPage(prev=>prev>1 ? prev-1:prev);
   }
   else if(arg===1){
    setoffsetdataValue(3)
    ShowComments();

   }
   else if(arg==2){
    setoffsetdataValue(6)
    ShowComments();
   }
   else if(arg==3){
    setoffsetdataValue(9)
    ShowComments();
   }

   else{
    setCurrentPage(arg)
   
   }
  // changePage()
}

function prevValue(){
  const currentOffsetvalue=offsetdataValue;
if(currentOffsetvalue>0){
setoffsetdataValue(currentOffsetvalue-3)
ShowComments();
}
  console.log(responseMetaData);
  
}

function nextValue(){
  const currentOffsetvalue=offsetdataValue;
  if(currentOffsetvalue< responseMetaData.pagination.total){
    setoffsetdataValue(currentOffsetvalue+3)
    ShowComments();
  }
  
}
// function changePage(){
//   const itemPerPage = 3
//   let offset = (currentPage-1)*itemPerPage
//   let itemToslice = currentPage*itemPerPage

//   console.log(offset,itemToslice)
//   setdataFetch(dataFetch.slice(offset,itemToslice))
//  // setdataFetch(dataFetch.slice(0,3))
// }
  const ShowComments = async () => {
    let dataFetch = await axios.get(`http://localhost:1337/api/commentsections?pagination[start]=${offsetdataValue}&pagination[limit]=3&sort[0]=id%3Adesc`)
    //console.log(JSON.stringify(dataFetch))
    setdataFetch(dataFetch.data?.data);
    setresponseMetaData(dataFetch.data?.meta);
    console.log(dataFetch);
    

  }


  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const emailChange = (e) => {
    setEmail(e.target.value)
  }
  const nameChange = (e) => {
    setname(e.target.value)
  }
  const websiteChange = (e) => {
    setwebsite(e.target.value)
  }
  const commentChange = (e) => {
    setComment(e.target.value)
  }

  const resetForm = () => {
    setEmail("")
    setname(
      ""
    )
    setComment("")
    setwebsite("")

  }

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
    if (result.statusText === "ok") {
      resetForm()

    }

  };


  //form validation handler
  const validate = (values) => {
    let errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // if (!values.email) {
    //   errors.email = "Cannot be blank";
    // } else if (!regex.test(values.email)) {
    //   errors.email = "Invalid email format";
    // }
    return errors;
  };
  //validation end

  console.log(name, email, website, comment);

  useEffect(() => {
    ShowComments()
    handlePaginate(1)
  }, [])


  useEffect(() => {
    if (result.statusText === "OK") {
      resetForm()
      setMessage("Thanks for submit successfully")




    }
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();





    }
  }, [formErrors, resetForm, result]);

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">{message}</span>


      )}
      <form noValidate >
      <div className="form-row">
          <label htmlFor="comment">Your comment <span style={{ color: "red" }}>*</span></label>
          <textarea
            type="comment"
            name="comment"
            id="comment"
            rows="10"
            cols="33"
            value={comment}
            onChange={commentChange}
            className={formErrors.comment && "input-error"}
          />
          {formErrors.comment && (
            <span className="error">{formErrors.comment}</span>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="name">Name <span style={{ color: "red" }}>*</span> </label>
          <input
            type="name"
            name="name"
            id="name"
            required

            value={name}
            onChange={nameChange}
            className={formErrors.name && "input-error"}
          />
          {formErrors.name && (
            <span className="error">{formErrors.name}</span>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="email">Email address<span style={{ color: "red" }}>*</span></label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={emailChange}
            className={formErrors.email && "input-error"}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="website">Website <span style={{ color: "red" }}>*</span></label>
          <input
            type="website"
            name="website"
            id="website"
            value={website}
            onChange={websiteChange}
            className={formErrors.website && "input-error"}
          />
          {formErrors.website && (
            <span className="error">{formErrors.website}</span>
          )}
        </div>
        
        <button onClick={
          // handleSubmit
submit

        } type="submit" className="postbutton">Post comment</button>
      </form>
      <div>
        <Comment data={dataFetch}
        />
      </div>

      <div className="paginationButton">
                <button onClick={()=>prevValue('prev')}>prev</button>
                <button onClick={()=>handlePaginate(1)}>1</button>
                <button onClick={()=>handlePaginate(2)}>2</button>
                <button onClick={()=>handlePaginate(3)}>3</button>
                
                <button onClick={()=>nextValue('next')}>next</button>
            </div>

    </div>

  );
};

export default Form;
