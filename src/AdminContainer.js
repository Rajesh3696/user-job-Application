import React,{useState}from 'react'
import Axios from 'axios'
import JobDetails from './JobDetails'


function AdminContainer(props) {
   const {profiles}=props
   const[job1,setjob1]=useState("Front-End Developer")

   const job =["Front-End Developer","Node.js Developer","MEAN Stack Developer","FULL Stack Developer"]

   const handleChange=(e)=>{
       const result=e.target.value
       setjob1(result)
   }
    return (
        <div>
            {
                job.map((ele,i)=>{
                    return(
                        <button type="button"  className="btn btn-primary" value={ele} onClick={handleChange} key={i}>{ele}</button>
                    )
                })
            }
            <JobDetails job1={job1} profiles={profiles}/>
        </div>
    )
}

export default AdminContainer
