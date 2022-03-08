import React, {useState} from "react";
import {useForm} from 'react-hook-form'
import './Register.css'
function Register() {
    /* By using useForm hook we store the data and check for validation errors and while form is submitted we printed the data in the console and we also render it 
    in the form of table
    */
    const {register,handleSubmit,formState:{errors}} = useForm()
    const [details, setDetails] = useState([])
    const onFormSubmmision = () => {
        var form = document.getElementById('form')
        form.addEventListener('submit', function(e) {
            var firstname = document.getElementById('fn').value
            var lastname = document.getElementById('ln').value
            var email = document.getElementById('email').value
            var phno = document.getElementById('phno').value
            var grade = document.getElementById('grade').value
            var dob = document.getElementById('dob').value
            //fetch post request
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method:'POST',
                body:JSON.stringify({
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    phno:phno,
                    grade:grade,
                    dob:dob
                }),
                headers:{
                    "Content-Type":"application/json; charset=UTF-8"
                }
            })
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                info(data)
            })
        })
    }
    
    let info = function(details) {
        setDetails(details)
    }
    return (
        <div id="bodyofform">
            <div>
                <p className="lead display-3">Fill the Details</p>
            </div>
            <form className="w-50 mx-auto" id="form" onSubmit={handleSubmit(onFormSubmmision)}>
                <div className="mt-3" id="firstname">
                    <label htmlFor="fn">First Name</label>
                    <input type="text" id="fn" className="form-control" placeholder="James" {...register("fn", {required:true})}></input>
                    {errors.fn?.type === 'required' && <p className="text-danger">*first name required</p>}
                </div>
                <div className="mt-3" id="lastname">
                    <label htmlFor="ln">Last Name</label>
                    <input type="text" id="ln" className="form-control" placeholder="Bond" {...register("ln", {required:true})}></input>
                    {errors.ln?.type === 'required' && <p className="text-danger">*last name required</p>}
                </div>
                <div className="mt-3" id="emailid">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" placeholder="abc@gmail.com" {...register("email", {required:true})}></input>
                    {errors.email?.type === 'required' && <p className="text-danger">*email required</p>}
                </div>
                <div className="mt-3" id="phonenumber">
                    <label htmlFor="phno">phone number</label>
                    <input type="text" id="phno" className="form-control" placeholder="70329XXXXX" {...register("phno", {required:true,minLength:10,maxLength:10})}></input>
                    {errors.phno?.type === 'required' && <p className="text-danger">*phone number required</p>}
                    {errors.phno?.type === 'minLength' && <p className="text-danger">*must contain 10 numbers</p>}
                    {errors.phno?.type === 'maxLength' && <p className="text-danger">*must contain 10 numbers</p>}
                </div>
                <div className="mt-3" id="gradeclass">
                    <label htmlFor="grade">grade</label>
                    <input type="text" id="grade" className="form-control" placeholder="9.8/10" {...register("grade", {required:true,max:10,min:0})}></input>
                    {errors.grade?.type === 'required' && <p className="text-danger">*grade is required</p>}
                    {errors.grade?.type === 'max' && <p className="text-danger">*max is 10</p>}
                    {errors.grade?.type === 'min' && <p className="text-danger">*min is 0</p>}
                </div>
                <div className="mt-3" id="dateofbirth">
                    <label htmlFor="dob">dob</label>
                    <input type="date" id="dob" className="form-control" {...register("dob", {required:true})}></input>
                    {errors.dob?.type === 'required' && <p className="text-danger">*dob required</p>}
                </div>
                
                <div className="text-center mb-5">
                    <button type="submit" className="btn btn-info" id="button1">Post</button>
                </div>
            </form>
            <div>
                <table className="table table-bordered">
                    <thead className="thead">
                        <tr>
                            <th scope="col">firstname</th>
                            <th scope="col">lastname</th>
                            <th scope="col">emailid</th>
                            <th scope="col">phno</th>
                            <th scope="col">grade</th>
                            <th scope="col">dob</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{details.firstname}</td>
                            <td>{details.lastname}</td>
                            <td>{details.email}</td>
                            <td>{details.phno}</td>
                            <td>{details.grade}</td>
                            <td>{details.dob}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Register;