import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";



class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };

        this.onChange = (name, valueProp = 'value') => (event) => this.setState({
            [name]: event.target[valueProp]
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
                            {/*<FormGroup row={true}>*/}
                                <TextField name="username" onChange={this.onChange('username')} label="Username"
                                           className={classes.textField}/>
                                <TextField name="password" type="password" onChange={this.onChange('password')}
                                           label="Password" className={classes.textField}/>
                            {/*</FormGroup>*/}
                            <div className={classes.columnCenter}>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                                <FormControlLabel control={
                                    <Checkbox name="remember" onChange={this.onChange('remember', 'checked')}/>
                                } label={"Remember me"}/>
                            </div>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const styles = theme => ({
    gridItem: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    columnCenter: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default withStyles(styles)(SignIn);
