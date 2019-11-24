import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

function App(props) {
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
    const newHabitList = [...habits, newHabitResult.data]
    setData(newHabitList)
    setNewHabit('')
    console.log({newHabitResult})
  }

    return (
      <div>
        SmartHabit
        <Button
          variant="outlined"
          onClick={handleButtonSubmit}
        >
          Add a Habit
        </Button>
        <TextField
            required
            id="filled-required"
            label="Required"
            onChange={handleHabitChange}
            margin="normal"
            variant="filled"
            value={newHabit}
          />
        <List component="nav" aria-label="secondary mailbox folders">
          {habits.map(habit => {
            const { _id: id, name } = habit;
            return (
              <ListItem key={id}>
                <ListItemText primary={name} />
              </ListItem>
            )
          })}
        </List>
      </div>
    );
}

export default App;
