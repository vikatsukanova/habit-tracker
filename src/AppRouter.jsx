import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { getToken } from './utils/tokens';
import SignIn from './SignIn';
import App from './App';

function AppRouter() {
  const [user, updateUser] = useState(null);

  async function handleFetchUser() {
    const token = getToken()
    if (token) {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { data } = await response.json();
        const [user] = data;
        updateUser(user)
      } catch (err) {
        console.error(err);
      }
    }
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/login"
            render={(renderProps) => {
              return (
                <SignIn fetchUser={handleFetchUser} />
              )
            }}
          />
          <Route
            path="/"
            component{App}
          />
        </Switch>
      </Router> 
    </div>
  );
}

export default AppRouter;