import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersList from './user/UsersList';
import AddUser from './user/AddUser';
import EditUser from './user/EditUser';

const AppRouter = () => {
    return <div style={style}>
        <Router>
            <Switch>
                <Route path="/" exact component={UsersList} />
                <Route path="/users" component={UsersList} />
                <Route path="/add-user" component={AddUser} />
                <Route path="/edit-user" component={EditUser} />
            </Switch>
        </Router>
    </div>;
}

const style = {
    marginTop: '20px'
}

export default AppRouter;