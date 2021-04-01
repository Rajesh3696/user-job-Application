import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Modal} from 'react-bootstrap'
import Userdetails from './Userdetails'
//  import {Button} from 'react-bootstrap'


function JobDetails(props) {
    const { job1, profiles } = props
    const [candidate, setCandidate] = useState("")
    const [show, setShow] = useState(false)


    const applications = profiles.filter((applicant) => {
        return applicant.jobTitle === job1
    })

    const handleDetails = (id) => {
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
            .then((response) => {
                const result = response.data
                setCandidate(result);
                console.log(result)
                setShow(true)

            })//success
            .catch((err) => {
                alert(err.message);
            }) //error

    }
    const shortlisted = (id) => {
        const element = id;
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${element}`, {
            "status": "shortlisted"
        })
            .then((response) => {
                const result = response.data
                console.log(result);
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const rejected = (id) => {
        const element = id;
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${element}`, {
            "status": "rejected"
        })
            .then((response) => {
                const result = response.data
                console.log(result);
            })
            .catch((err) => {
                alert(err.message)
            })

    }
    const handleClose = () => {
        setShow(false)
    }

    return (
        <div>
            <h3>{job1}</h3>
            <p>List of candidates applied for {job1}</p>
            <table class="table">
                <tr>
                    <th>Name</th>
                    <th>Technical Skills</th>
                    <th>Experience</th>
                    <th>Applied Date</th>
                    <th>view Deatils</th>
                    <th>Update Application Status</th>
                </tr>
                <tbody>
                    {
                        applications.map((ele) => {
                            return (
                                <tr key>
                                    <td>{ele.name}</td>
                                    <td>{ele.skills}</td>
                                    <td>{ele.experience}</td>
                                    <td>{ele.createdAt.slice(0, 10)}</td>
                                    <td><button type="button" class="btn btn-primary" key={ele._id} onClick={() => {
                                        handleDetails(ele._id)
                                        setShow(true)
                                    }}>View Details</button></td>
                                    {
                                        ele.status === "applied" && (<td><button type="button" class="btn btn-success" onClick={() => {
                                            // shortlistnotify()
                                            shortlisted(ele._id)
                                        }}>shortlist</button><button type="button" class="btn btn-danger" onClick={() => {
                                            // rejectnotify()
                                            rejected(ele._id)
                                        }}>reject</button></td>)
                                    }
                                    {
                                        ele.status === "rejected" && (<td><button type="button" class="btn btn-primary" disabled="true">rejected</button></td>)
                                    }
                                    {
                                        ele.status === "shortlisted" && (<td><button type="button" class="btn btn-primary" disabled="true">shortlisted</button></td>)
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
                  { show&& ( <Userdetails candidate={candidate} show={show} handleClose={handleClose}/>)} }

        </div>
    )
}

export default JobDetails
