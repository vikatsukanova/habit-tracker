import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'baseline',
  },
  newHabitSubmitButton: {
    flex: 1
  }
});

export default function Main(props) {
  const classes = useStyles();

  const [habits, setData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const result = await fetch('/api/books')
      const habits = await result.json()
      setData(habits.data);
    };
    fetchData();
  }, []);

  const handleButtonComplete = async (id) => {
    console.log({id})
  }

  const handleButtonDelete = async (id) => {
    console.log(id);

    const data = {
      _id: id
    }

    const response = await fetch('/api/books/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    setData(habits.filter(habit => habit._id !== id));

  }

  return (
    <div>
      <div className={classes.root}>
        <Button
          className={classes.newHabitSubmitButton}
          fullWidth
          variant="outlined"
          onClick={() => { props.history.push('/create'); }}
        >
          Add a Habit
        </Button>
      </div>
      {habits.length > 0 ? (
        <Card>
          <List component="nav" aria-label="secondary mailbox folders">
            {habits.map(habit => {
              const { _id: id, name, completed } = habit;
              return (
                <ListItem divider button key={id}>
                  <ListItemText primary={name} />
                  <Button
                      variant="outlined"
                      onClick={() => handleButtonComplete(id)}
                      color={completed ? "primary" : "default"}
                    >
                      {completed ? "Completed" : "Mark Complete"}
                    </Button>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleButtonDelete(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              )
            })}
          </List>
        </Card>
      ) : (
        <div>There are no habits yet.</div>
      )}
    </div>
  )
}



