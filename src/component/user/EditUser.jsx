import React, { useState, useEffect } from 'react';
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import classes from './EditUser.module.css';

const EditUser = props => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [salary, setSalary] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        ApiService.fetchUserById(window.localStorage.getItem("userId"))
            .then((res) => {

                setUserId(window.localStorage.getItem("userId"));
                setUsername(res.data.username);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setAge(res.data.age);
                setSalary(res.data.salary);
            });
    }, [])

    const saveUser = e => {
        e.preventDefault();

        const user = {
            id: userId,
            username: username,
            firstName: firstName,
            lastName: lastName,
            age: age,
            salary: salary
        };
        
        ApiService.editUser(user)
            .then(res => {
                setMessage('User added successfully.');
                props.history.push('/users-list');
            });
    }

    return <React.Fragment>
        {userId === '' ? <Typography variant="h4" className={classes.Typography} >User not found!</Typography>
            : <div><Typography variant="h4" className={classes.Typography} >Edit User</Typography>
                <form>

                    <TextField type="text" placeholder="username" fullWidth margin="normal" name="username" readOnly
                        value={username} />

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
                </form></div>
        }
    </React.Fragment>;
}

export default EditUser;
