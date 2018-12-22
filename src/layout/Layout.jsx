import React from 'react';
import {UIView} from "@uirouter/react";

import NavigationMenu from './NavigationMenu';
import withRoot from './withRoot';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
    content: {
        padding: theme.spacing.unit,
        paddingTop: theme.spacing.unit * 2,
        textAlign: 'center'
    }
});

class Layout extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <NavigationMenu/>
                <main className={classes.content}>
                    <UIView/>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(withRoot(Layout));
