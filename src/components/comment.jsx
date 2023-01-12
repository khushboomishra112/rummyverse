
// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import ReactPaginate from 'react-paginate';
// import axios from 'axios'

// // Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];


// // function Items({ currentItems }) {
// //   return (
// //     <>
// //       {currentItems &&
// //         currentItems.map((item) => (
// //           <div>
// //             <h3>{item}</h3>
// //           </div>
// //         ))}
// //     </>
// //   );
// // }

// export default function Comment({ itemsPerPage }) {
//     const [data,setData]  = useState(null);

//  useEffect(() => {
//     // Update the document title using the browser API
    
// this.ShowComments();
// console.log('data', data);
//   });
//     const ShowComments = async () => {
//         let dataFetch = await axios.get('http://localhost:1337/api/commentsections')
//         //console.log(JSON.stringify(dataFetch))
//         setData(dataFetch);
//       }
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);


//   const endOffset = itemOffset + itemsPerPage;
//   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//   const currentItems = data.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(data.length / itemsPerPage);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % data.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };

//   return (
    
//     <>
    
//       {/* <Items currentItems={currentItems} /> */}
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }









import React from "react";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import moment from "moment";


const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div>
              <h3>Item #{item}</h3>
            </div>
          ))}
      </>
    );
  }
  
function filterDate(commentData){
    //commentData.sort((a,b)=>a.attributes.createdAt-b.attributes.createdAt)
    commentData.sort((a,b)=>{
       return b.id-a.id  
    })
}


const Comment = (props) => {
console.log(props)
    const [pageCount, setPageCount] = useState(1)
    const handlePageClick = () => {
    }

//ilterDate(props?.data?.data?.data)
if(props.data){
  //  console.log('special',props?.data)
    filterDate(props?.data)
}


    return (
        <div class="commentdiv">
            <div className="comment">
            <h2 style={{ fontSize: "30px" }}>Latest Comments({props?.data.length})</h2>
            {props.data.length>0  && props.data.map((value, index) => {
              //  console.log(value);
                return (
                    <div>
                        <div className="userComment" key={
                            index
                        }>
                            <div style={{ display: "flex", marginTop: "30px" ,gap:"10px"}}>
                                <span style={{ color: "black", fontSize: "18px", fontWeight:"700px"}} >
                                    {value.attributes.name}
                                </span>
                               
                                <p>on {moment(value.attributes.createdAt).format("Do MMMM YYYY")}</p>
                            </div>
                            <p>
                                {value.attributes.comment}</p>
                        </div>
                    </div>
                )
            })}
            {/* <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous--"
                renderOnZeroPageCount={null}
                itemsPerPage={2}
            /> */}
            </div>
            
        </div>
    )
}

export default Comment;
