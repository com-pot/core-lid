import React from 'react';
import rest from "../../../services/restInstance";

import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Typography from "@material-ui/core/es/Typography/Typography";
import InfoNib from "../controls/InfoNib";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
        };
    }


    async componentDidMount() {
        try {
            const user = await rest.get("users/" + this.props.userId);

            this.setState({user});
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const {user} = this.state;
        if (!user) {
            return <div>Loading...</div>
        }

        const {classes} = this.props;

        return (
            <Paper>
                <div className={classes.shield}>
                    <Avatar color="#CCC">GM</Avatar>
                    <Typography className={classes.shieldMotto} variant="caption">"{user.motto}"</Typography>
                </div>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography variant="body1" dangerouslySetInnerHTML={{__html: user.description}}/>
                    </Grid>
                    <Grid item xs={4}>
                        {user.infoNibs.map((nib, i) => <InfoNib key={i} nib={nib}/>)}
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

const styles = (theme) => ({
    shield: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.unit
    },
    shieldMotto: {
        marginTop: theme.spacing.unit
    }

});

export default withStyles(styles)(UserProfile);