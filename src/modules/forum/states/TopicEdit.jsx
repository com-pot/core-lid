import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/es/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";

import Button from "@material-ui/core/es/Button/Button";
import * as strings from '../../../services/strings'
import {withStyles} from "@material-ui/core/styles";


/**
 * @property {{id: string, title: string}[]} props.categories
 */
class TopicEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            slug: '',
            description: '',
            category: this.props.categories[0].id,
        };
    }

    handleChangeValue(name) {
        return (event) => this.setState({[name]: event.target.value});
    }

    handleSubmit() {
        let payload = Object.assign({}, this.state);
        payload.slug = payload.slug || strings.sanitize(this.state.title);
        console.log(payload);
    }

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;

        return (
            <Card>
                <CardContent>
                    <form onSubmit={(event) => this.handleSubmit() || event.preventDefault()}>
                        <Grid container spacing={8}>
                            <Grid item xs={5}>
                                <TextField name="title" onChange={this.handleChangeValue("title")}
                                           label="Title" value={this.state.title} fullWidth={true}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField name="slug" onChange={this.handleChangeValue("slug")}
                                           label="Identifier" placeholder={strings.sanitize(this.state.title)}
                                           InputLabelProps={{shrink: true}} value={this.state.slug} fullWidth={true}/>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel>Category</InputLabel>
                                    <Select name="category" onChange={this.handleChangeValue("category")}
                                            className={classes.withLabel} value={this.state.category} fullWidth={true}>
                                        {this.props.categories.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="description" onChange={this.handleChangeValue("description")}
                                           multiline={true} rows={4}
                                           label="Description" value={this.state.description} fullWidth={true}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" className={classes.withLabel} variant="contained" color="primary">Save</Button>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        )
    }
}

const styles = (theme) => ({
    withLabel: {
        marginTop: 2 * theme.spacing.unit
    }
});

export default withStyles(styles)(TopicEdit);