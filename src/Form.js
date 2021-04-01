import React, { useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import './App.css'
import * as Yup from 'yup'
import { Formik } from 'formik'

const formschema = Yup.object().shape(({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    phone: Yup.string().required(),
    experience: Yup.string().required(),
    jobTitle: Yup.string().required(),
    skills: Yup.string().required()
}))
function Form(props) {

    const formSubmit = (data) => {
        console.log("data",data)
            axios.post("http://dct-application-form.herokuapp.com/users/application-form",data)
                .then((response) => {
                    const result = response.data;
                    console.log(result);
                    // window.location.reload();
                })
                .catch((err) => {
                    alert(err.message)
                    
                })
    }
    return (
        <div>
            <Formik initialValues={{
                name:"",
                email: "",
                phone: "",
                skills: "",
                jobTitle: "",
                experience: ""
            }}
                validationSchema={formschema}
                onSubmit={(data,onSubmit) => {
                    formSubmit(data)
                    onSubmit.resetForm()
                }}>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    resetForm
                }) => {
                    return (
                        <div>
                            <div class="font">
                                <div class="col d-flex justify-content-center" >
                                    <div class="card" style={{ width: "50rem", height: "50rem", position: "absolute", left: "500px", top: "50px" }}>
                                        <div class="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <label>Full name</label>
                                                <input type="text" value={values.name} name="name" placeholder="name" onBlur={handleBlur} onChange={handleChange} />{errors.name && touched.name && <p>{errors.name}</p>}<br />
                                                <label>Email address</label>
                                                <input type="text" value={values.email} name="email" placeholder="example@gmail.com" onBlur={handleBlur} onChange={handleChange} />{errors.email && touched.email && <p>{errors.email}</p>}<br />
                                                <label>Contact number</label>
                                                <input type="text" value={values.phone} name="phone" placeholder="+91 9003533372" onBlur={handleBlur} onChange={handleChange} />{errors.phone && touched.phone && <p>{errors.phone}</p>}<br />
                                                <label>Applying for Job : </label>
                                                <select className="font" name="job" value={values.jobtitle} onChange={handleChange} onBlur={handleBlur}>
                                                    <option value="">select Job </option>
                                                    <option value="Front-End Developer"> Front-End Developer</option>
                                                    <option value="Node.js Developer"> Node js Developer</option>
                                                    <option value="MEAN Stack Developer"> MEAN Stack Developer</option>
                                                    <option value="FULL Stack Developer"> FULL Stack Developer</option>
                                                </select><br />
                                                <label>Experience</label>
                                                <input type="text" value={values.experience} name="experience" onBlur={handleBlur} placeholder="experience(2 years)" onChange={handleChange} />{errors.experience && touched.experience && <p>{errors.experience}</p>}<br />
                                                <label>Technical skills</label>
                                                <textarea value={values.skills} name="skills" placeholder="Technical Skills(eg:html,react)" onBlur={handleBlur} onChange={handleChange} />{errors.skills && touched.skills && <p>{errors.skills}</p>}<br />
                                                <input className="Button" type="submit" value="submit" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Formik>
        </div>
    )
    // const { formSubmit } = props
    // const [name, SetName] = useState('')
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    // const [jobtitle, setJobtitle] = useState('')
    // const [experience, setExperience] = useState('')
    // const [skills, setSkills] = useState('')
    // const [formerrors, setFormerrors] = useState('')
    // const errors = {}
    // const handleChange = (e) => {
    //     const attr = e.target.name
    //     if (attr === 'name') {
    //         SetName(e.target.value)
    //     } else if (attr === 'email') {
    //         setEmail(e.target.value)
    //     } else if (attr === 'phone') {
    //         setPhone(e.target.value)
    //     } else if (attr === 'job') {
    //         setJobtitle(e.target.value)
    //     } else if (attr === 'experience') {
    //         setExperience(e.target.value)
    //     } else if (attr === 'skills') {
    //         setSkills(e.target.value)
    //     }
    // }
    // const runValidations = () => {
    //     if (name.trim().length === 0) {
    //         errors.name = "name is required"
    //     }
    //     if (email.trim().length === 0) {
    //         errors.email = "email is required"
    //     } else if (!validator.isEmail(email)) {
    //         errors.email = 'invalid email format'
    //     }
    //     if (phone.trim().length === 0) {
    //         errors.phone = "Phonenumber is required"
    //     }
    //     if (experience.trim().length === 0) {
    //         errors.experience = "experience is blank"
    //     }
    //     if (skills.trim().length === 0) {
    //         errors.skills = "skill is blank"
    //     }

    // }
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     runValidations();
    //     formSubmit()
    //     handleReset()
    // }
    // const handleReset = () => {
    //     SetName('')
    //     setEmail('')
    //     setExperience('')
    //     setPhone('')
    //     setJobtitle('')
    //     setSkills('')
    // }

   
}

export default Form
