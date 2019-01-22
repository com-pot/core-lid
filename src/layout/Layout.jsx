import React from 'react';
import {UIView} from "@uirouter/react";
import Grid from "@material-ui/core/Grid";

import NavigationMenu from './NavigationMenu';
import withRoot from './withRoot';
import {withStyles} from '@material-ui/core/styles';

class Layout extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <NavigationMenu/>
                <Grid container spacing={8}>
                    <Grid item xs={false} md={2}/>
                    <Grid item xs={12} md={8}>
                        <main className={classes.layoutContent}>
                            <UIView/>
                        </main>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = () => ({
    layoutContent: {
        textAlign: 'center'
    }
});

export default withStyles(styles)(withRoot(Layout));
