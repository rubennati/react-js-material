import React, { useState, useEffect } from 'react';
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import classes from './UsersList.module.css';

const UsersList = props => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        ApiService.fetchUsers()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setUsers(res.data);
                }
            });
    }, [])

    const newUser = () => {
        window.localStorage.removeItem("userId");
        props.history.push('/new-user');
    };

    const updateUser = userId => {
        window.localStorage.setItem("userId", userId);
        props.history.push('/edit-user');
    };

    const deleteUser = userId => {
        ApiService.deleteUser(userId)
            .then(res => {
                setMessage('User deleted successfully.');

                setUsers(users.filter(user => user.id !== userId));
            })
    };

    return <React.Fragment>
        <Typography variant="h4" className={classes.Typography}>User Details</Typography>
        <Button variant="contained" color="primary" onClick={() => newUser()}>
            Add User
                </Button>

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>FirstName</TableCell>
                    <TableCell align="right">LastName</TableCell>
                    <TableCell align="right">UserName</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell align="right">Salary</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="right">{row.firstName}</TableCell>
                        <TableCell align="right">{row.lastName}</TableCell>
                        <TableCell align="right">{row.username}</TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">{row.salary}</TableCell>
                        <TableCell align="right" onClick={() => updateUser(row.id)}><CreateIcon /></TableCell>
                        <TableCell align="right" onClick={() => deleteUser(row.id)}><DeleteIcon /></TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>

        {message && <p>{message}</p>}
    </React.Fragment>;
};

export default UsersList;
