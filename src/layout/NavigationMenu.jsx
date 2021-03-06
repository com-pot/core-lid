import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {UISref} from "@uirouter/react";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function NavigationMenu(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <UISref to="app.intro">
                        <Button color="inherit" className={classes.grow}>
                            Intro
                        </Button>
                    </UISref>
                    <UISref to="app.forum.topicListing">
                        <Button color="inherit" className={classes.grow}>
                            Forum
                        </Button>
                    </UISref>
                    <UISref to="app.registration">
                        {/*todo: instead of link, use dialog*/}
                        <Button color="inherit">Login</Button>
                    </UISref>

                </Toolbar>
            </AppBar>
        </div>
    );
}

NavigationMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationMenu);
