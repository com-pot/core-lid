import React from 'react';
import {UIView} from "@uirouter/react";

import NavigationMenu from './NavigationMenu';
import withRoot from './withRoot';
import {withStyles} from '@material-ui/core/styles';

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

const styles = (theme) => ({
    content: {
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        textAlign: 'center'
    }
});

export default withStyles(styles)(withRoot(Layout));
