import React, { useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Form from './Form';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState({
    firstName: 'Chandu',
    lastName: 'Jinka',
    email: 'chandujinka9@gmail.com',
    street: 'chandupuram',
    city: 'Hyderabad',
    state: 'Telangana',
    zip: '533238',
    country: 'India',
    phone: '1234567890',
    amount: 200
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const updateData = {
      ...data,
      [e.target.name]: e.target.value
    }
    setData(updateData);
    // console.log(updateData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('https://assignment-roiim-chandu.herokuapp.com/api/token', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        const token = result.token;
        const billingAddress = {
          city: data.city,
          street: data.street,
          zip: data.zip,
          country: 'US',
          state: 'NY'
        };

        const customer = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          dateOfBirth: {
            day: 4,
            month: 5,
            year: 1998
          }
        };

        function uuidv4() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }

        const uuid = uuidv4();

        setIsLoading(window.checkout(token, billingAddress, customer, uuid, data.amount));
      });
  }

  return (
    <React.Fragment>
      <div className="forms">
      <CssBaseline />
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h3" color="inherit" noWrap align="center">
            ROIIM Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" style={{ marginBottom: '27px', textDecoration: 'underline' }}>
            Checkout
          </Typography>
          <form onSubmit={handleSubmit}>
            <Form data={data} handleChange={handleChange}  />
            <div className={classes.buttons}>
              {
                isLoading ?
                  <CircularProgress />
                  :
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    type="submit"
                  >
                    Pay
              </Button>}
            </div>
          </form>
        </Paper>
      </main>
      </div>
    </React.Fragment>
  );
}

export default App;
