import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        employment_identity: "employer",
        employment_interest: "employee",
        url: "",
        about: "",
        matches: []

    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Employment Identity</label>
                        <div className="multiple-input-container">
                            <input
                                id="employer-gender-identity"
                                type="radio"
                                name="employment_identity"
                                value="employer"
                                onChange={handleChange}
                                checked={formData.employment_identity === "employer"}
                            />
                            <label htmlFor="employer-gender-identity">Employer</label>
                            <input
                                id="employee-gender-identity"
                                type="radio"
                                name="employment_identity"
                                value="employee"
                                onChange={handleChange}
                                checked={formData.employment_identity === "employee"}
                            />
                            <label htmlFor="employee-gender-identity">Employee</label>
                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="employment_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.employment_identity === "more"}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label>Show Me</label>

                        <div className="multiple-input-container">
                            <input
                                id="employer-gender-interest"
                                type="radio"
                                name="employment_interest"
                                value="employer"
                                onChange={handleChange}
                                checked={formData.employment_interest === "employer"}
                            />
                            <label htmlFor="employer-gender-interest">Employers</label>
                            <input
                                id="employee-gender-interest"
                                type="radio"
                                name="employment_interest"
                                value="employee"
                                onChange={handleChange}
                                checked={formData.employment_interest === "employee"}
                            />
                            <label htmlFor="employee-gender-interest">Employees</label>
                            <input
                                id="everyone-employment-interest"
                                type="radio"
                                name="employment_interest"
                                value="everyone"
                                onChange={handleChange}
                                checked={formData.employment_interest === "everyone"}
                            />
                            <label htmlFor="everyone-employment-interest">Both</label>

                        </div>

                        <label htmlFor="about">Employment Profile</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="About me..."
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                    </section>

                    <section>

                        <label htmlFor="url">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>


                    </section>

                </form>
            </div>
        </>
    )
}
export default OnBoarding
