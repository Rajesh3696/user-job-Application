import React,{useState,useEffect} from 'react'
import axios from 'axios'
import AdminContainer from'./AdminContainer'
function Admin(props) {
    const[profiles,setProfiles]=useState([])

    useEffect(()=>{
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const result=response.data
            setProfiles(result)
        }).catch((err)=>{
            alert(err.message)
        })
    })
    return (
        <div>
            <h2>Admin Dashboard</h2>
        <AdminContainer profiles={profiles}/>
        </div>
    )
}

export default Admin
 