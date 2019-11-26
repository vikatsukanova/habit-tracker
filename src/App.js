import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'baseline',
  },
  newHabitField: {
    flex: 4,
    marginRight: 5
  },
  newHabitSubmitButton: {
    flex: 1
  }
});

function App(props) {
  const classes = useStyles();

  const [habits, setData] = useState([]);
  const [newHabit, setNewHabit] = useState('')

  useEffect(() => {
    const fetchData = async() => {
      const result = await fetch('/api/books')
      const habits = await result.json()
      setData(habits.data);
    };
    fetchData();
  }, []);

  const handleHabitChange = (event) => {
    const input = event.target.value
    setNewHabit(input)
  }

  const handleButtonSubmit = async (event) => {
    const data = {
      name: newHabit,
    }

    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const newHabitResult = await response.json()
    setData(habits.concat(newHabitResult.data))
    setNewHabit('')
  }

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5">SmartHabit</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <div className={classes.root}>
            <TextField
              className={classes.newHabitField}
              fullWidth
              required
              id="filled-required"
              label="New Habit"
              onChange={handleHabitChange}
              margin="normal"
              value={newHabit}
            />
            <Button
              className={classes.newHabitSubmitButton}
              fullWidth
              variant="outlined"
              onClick={handleButtonSubmit}
            >
              Add a Habit
            </Button>
          </div>
          <Card>
            <List component="nav" aria-label="secondary mailbox folders">
              {habits.map(habit => {
                const { _id: id, name } = habit;
                return (
                  <ListItem divider button key={id}>
                    <ListItemText primary={name} />
                  </ListItem>
                )
              })}
            </List>
          </Card>
        </Container>
      </React.Fragment>
    );
}

export default App;
