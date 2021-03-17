import React, { useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import './App.css'
function Form(props) {
    // const { formSubmit } = props
    const [name, SetName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [jobtitle, setJobtitle] = useState('')
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState('')
    const [formerrors, setFormerrors] = useState('')
    const errors = {}
    const handleChange = (e) => {
        const attr = e.target.name
        if (attr === 'name') {
            SetName(e.target.value)
        } else if (attr === 'email') {
            setEmail(e.target.value)
        } else if (attr === 'phone') {
            setPhone(e.target.value)
        } else if (attr === 'job') {
            setJobtitle(e.target.value)
        } else if (attr === 'experience') {
            setExperience(e.target.value)
        } else if (attr === 'skills') {
            setSkills(e.target.value)
        }
    }
    const runValidations = () => {
        if (name.trim().length === 0) {
            errors.name = "name is required"
        }
        if (email.trim().length === 0) {
            errors.email = "email is required"
        } else if (!validator.isEmail(email)) {
            errors.email = 'invalid email format'
        }
        if (phone.trim().length === 0) {
            errors.phone = "Phonenumber is required"
        }
        if (experience.trim().length === 0) {
            errors.experience = "experience is blank"
        }
        if (skills.trim().length === 0) {
            errors.skills = "skill is blank"
        }

    }
    const formSubmit = (data) => {
        if (Object.keys(errors).length === 0) {
            axios.post("http://dct-application-form.herokuapp.com/users/application-form", {
                name: name,
                email: email,
                phone: phone,
                skills: skills,
                jobTitle: jobtitle,
                experience: experience
            })
                .then((response) => {
                    const result = response.data;
                    console.log(result);
                    // window.location.reload();
                })
                .catch((err) => {
                    alert(err.message)
                    setFormerrors(errors);
                })

        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        runValidations();
        formSubmit()
        handleReset()
    }
    const handleReset = () => {
        SetName('')
        setEmail('')
        setExperience('')
        setPhone('')
        setJobtitle('')
        setSkills('')
    }

    return (
        <div>
            <div class="font">
                <div class="col d-flex justify-content-center" >
                    <div class="card" style={{ width: "50rem", height: "50rem", position: "absolute", left: "500px", top: "50px" }}>
                        <div class="card-body">
                            <form onSubmit={handleSubmit}>
                                <label>Full name</label>
                                <input type="text" value={name} name="name" placeholder="name" onChange={handleChange} />{formerrors.name && <span> {formerrors.name} </span>}<br />
                                <label>Email address</label>
                                <input type="text" value={email} name="email" placeholder="example@gmail.com" onChange={handleChange} />{formerrors.email && <span> {formerrors.email} </span>}<br />
                                <label>Contact number</label>
                                <input type="text" value={phone} name="phone" placeholder="+91 9003533372" onChange={handleChange} />{formerrors.phone && <span> {formerrors.phone} </span>}<br />
                                <label>Applying for Job : </label>
                                <select className="font" name="job" value={jobtitle} onChange={handleChange}>
                                    <option value="">select Job </option>
                                    <option value="Front-End Developer"> Front-End Developer</option>
                                    <option value="Node.js Developer"> Node js Developer</option>
                                    <option value="MEAN Stack Developer"> MEAN Stack Developer</option>
                                    <option value="FULL Stack Developer"> FULL Stack Developer</option>
                                </select><br />
                                <label>Experience</label>
                                <input type="text" value={experience} name="experience" placeholder="experience(2 years)" onChange={handleChange} />{formerrors.experience && <span> {formerrors.experience} </span>}<br />
                                <label>Technical skills</label>
                                <textarea value={skills} name="skills" placeholder="Technical Skills(eg:html,react)" onChange={handleChange} />{formerrors.skills && <span> {formerrors.skills} </span>}<br />
                                <input className="Button" type="submit" value="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
