import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    gridItem: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onChange = (name) => (event) => this.setState({
            [name]: event.target.value
        });

        this.handleSubmit = (event) => {
            event.preventDefault();
            console.log(this.state);
        }
    }


    render() {
        const {classes} = this.props;

        return (
            <Grid container alignItems="center" spacing={16}>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <Paper className={classes.gridItem}>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="username" onChange={this.onChange('username')} label="Username" className={classes.textField}/>
                            <TextField name="password" type="password" onChange={this.onChange('password')} label="Password" className={classes.textField}/>
                            <hr/>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(SignIn);
