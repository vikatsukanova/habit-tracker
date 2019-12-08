import React, { useState } from 'react';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FormLabel from '@material-ui/core/FormLabel';

const TIME_PERIODS = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(8, 0, 6),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttonField: {
    marginTop: theme.spacing(1),
  },
}));

export default function Form(props) {
  const classes = useStyles();

  const [name, updateHabitName] = useState('');
  const [goal, updateGoal] = useState(1);
  const [period, updatePeriod] = useState('');

  async function createHabit() {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          goal,
          period,
        })
      });

      props.history.push('/');

      const resp = await response.json();
      console.log(resp);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <Container className={classes.content} maxWidth="md">
      <form>
        <div>
          <Typography component="h6" variant="h6" align="left" color="textPrimary">
            Add a Habit
          </Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="standard-multiline-flexible"
              label="Name"
              multiline
              rowsMax="2"
              className={classes.textField}
              margin="normal"
              value={name}
              onChange={(e) => updateHabitName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel shrink htmlFor="select-multiple-native">
                Goal
              </InputLabel>
              <NativeSelect
              id="demo-customized-select-native"
              value={goal}
              onChange={(e) => {updateGoal(e.target.value);}}
              input={<BootstrapInput />}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Goal Period
            </InputLabel>
            {_.map(TIME_PERIODS, periodName => (
              <Chip
                label={periodName}
                onClick={() => updatePeriod(periodName)}
                variant={period === periodName ? 'default' : 'outlined'}
               />
            ))}
          </Grid>
        </Grid>
        <div>
          <Button
              className={classes.buttonField}
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => 
                props.history.push('/')
              }
            >
            Cancel
          </Button>
          <Button
              className={classes.buttonField}
              size="small"
              variant="contained"
              color="primary"
              onClick={() => 
                createHabit()
              }
            >
            Save
          </Button>
        </div>
      </form>
    </Container>
  );
} 