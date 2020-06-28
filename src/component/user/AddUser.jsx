import React, { useState } from 'react';
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import classes from './AddUser.module.css';

const AddUser = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [salary, setSalary] = useState('');
    const [message, setMessage] = useState(null);

    const saveUser = e => {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            age: age,
            salary: salary
        };

        ApiService.addUser(user)
            .then(res => {
                setMessage('User added successfully.');
                props.history.push('/users-list');
            });
    }

    return <React.Fragment>
        <Typography variant="h4" className={classes.Typography}>Add User</Typography>
        <form className={classes.FormContainer}>

            <TextField type="text" placeholder="username" fullWidth margin="normal" name="username"
                value={username} onChange={e => setUsername(e.target.value)} />

            <TextField type="password" placeholder="password" fullWidth margin="normal" name="password"
                value={password} onChange={e => setPassword(e.target.value)} />

            <TextField placeholder="First Name" fullWidth margin="normal" name="firstName"
                value={firstName} onChange={e => setFirstName(e.target.value)} />

            <TextField placeholder="Last name" fullWidth margin="normal" name="lastName"
                value={lastName} onChange={e => setLastName(e.target.value)} />

            <TextField type="number" placeholder="age" fullWidth margin="normal" name="age"
                value={age} onChange={e => setAge(e.target.value)} />

            <TextField type="number" placeholder="salary" fullWidth margin="normal" name="salary"
                value={salary} onChange={e => setSalary(e.target.value)} />

            <Button variant="contained" color="primary" onClick={saveUser}>Save</Button>

            {message && <p>{message}</p>}
        </form>
    </React.Fragment>;
};

export default AddUser;
