import React from 'react';
import rest from "../../../services/restInstance";

import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Typography from "@material-ui/core/es/Typography/Typography";
import InfoNibbleSingle from "../controls/InfoNibbleSingle";
import Button from "@material-ui/core/es/Button/Button";
import SettingsIcon from "@material-ui/icons/Settings"
import NibblesModal from "../controls/NibblesModal";

/**
 * @property {Object} user
 * @property {InfoNibbleSingle[]} user.infoNibbles
 */
class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            nibblesOpen: false,
            saving: false,
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

    handleModal(result) {
        this.setState({
            nibblesOpen: false,
            saving: !!result,
        });

        if(result) {
            // todo: save result
            setTimeout(() => {
                this.setState({
                    user: {...this.state.user, infoNibbles: result},
                    saving: false,
                });
            }, 200);
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
                        <Button onClick={() => this.setState({nibblesOpen: true})}>
                            <SettingsIcon/>
                        </Button>
                        <NibblesModal open={this.state.nibblesOpen} onClose={(result) => this.handleModal(result)}
                                      nibbles={user.infoNibbles}/>

                        {user.infoNibbles.map((nibble, i) => <InfoNibbleSingle key={i} nibble={nibble}/>)}
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