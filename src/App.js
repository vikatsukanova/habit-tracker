import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Form from "./Form";
import EditForm from "./EditForm";
import Main from "./Main";

function App(props) {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5">SmartHabit</Typography>
          </Toolbar>
        </AppBar>
        <Container>
        <Router>
          <Switch>
            <Route
              exact
              path="/create"
              component={Form}
            />
            <Route
              exact
              path="/"
              component={Main}
            />
            <Route
              exact
              path="/habit/:id"
              component={EditForm}
            />
          </Switch>
        </Router>
        </Container>
      </React.Fragment>
    );
}

export default App;
