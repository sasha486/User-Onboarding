import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const UserForm = () => {
  return (
    <Form>
      <Form.Field>
        <label>First Name</label>
        <input  />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input  />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input type='email' name='email'></input>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input type='password' name='password'></input>
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default UserForm;
