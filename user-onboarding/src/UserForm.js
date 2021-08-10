import React, { useState, useEffect } from 'react';


import axios from 'axios';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  name: yup.string().required('Name is a required field.'),
  email: yup.string().email('Must be a valid email address.').required(),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must contain a minimum of 8 characters with at least one uppercase letter, one number, and one special character'
    ),
  terms: yup.boolean().oneOf([true], 'please agree to terms'),
});

export default function UserForm() {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    terms: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: '',
  });

  const [user, setUser] = useState([]);

  useEffect(() => {
    formSchema.isValid(value).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [value]);

  const formSubmit = (newUser, event) => {
    event.preventDefault();
    axios
      .post('https://reqres.in/api/users', newUser)
      .then((res) => {
        setUser([...user, newUser]);

        setValue({
          name: '',
          email: '',
          password: '',
          terms: '',
        });
      })
      .catch((err) => console.log(err.response));
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: '',
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...value,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    validateChange(e);
    setValue(newFormData);
  };
  return (
    <div className= ' container ui segment'>
      <div>
        <form className='ui form' onSubmit={formSubmit}>
           <div className='field'>
          <label className='label' htmlFor='name'>
            Name:
            <input
              type='text'
              name='name'
              value={value.name}
              onChange={inputChange}
            />
            {errors.name.length > 0 ? (
              <p className='error'>{errors.name}</p>
            ) : null}
          
          </label>
          </div>
           <div className='field'>
          <label className='label' htmlFor='email'>
            Email:
            <input
              type='text'
              name='email'
              value={value.email}
              onChange={inputChange}
            />
            {errors.email.length > 0 ? (
              <p className='error'>{errors.email}</p>
            ) : null}
          </label>
          </div>
           <div className='field'>
          <label className='label' htmlFor='email'>
            Password:
            <input
              type='password'
              name='password'
              value={value.password}
              onChange={inputChange}
            />
            {errors.password.length > 0 ? (
              <p className='error'>{errors.password}</p>
            ) : null}
          </label>
          </div>
             <div className='field'>
          <label className='terms' htmlFor='terms' >
            <input
              type='checkbox'
              name='terms'
              checked={value.terms}
              onChange={inputChange}
            />
            Terms & Conditions
          </label>
          </div>
          <br />

          <button className = "ui button"disabled={buttonDisabled} type='submit'>
            Submit
          </button>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        
        </form>
      </div>
    </div>
  );
}
