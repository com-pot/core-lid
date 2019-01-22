import React from 'react';

import {UISref} from "@uirouter/react";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';
import DateControl from '../../generic/components/DateControl'

import rest from "../../../services/restInstance";
import Button from "@material-ui/core/Button";
import SearchField from "../../generic/components/SearchField";

class TopicListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            topics: [],
            totalTopics: 0
        };
    }

    async componentDidMount() {
        const page = this.props.page || 1;
        const {pagination} = this.props;

        try {
            const topics = await rest.get("forum/topics", {query: {page: page}});

            this.setState({
                topics: topics.slice(pagination.offset, pagination.offset + pagination.limit),
                totalTopics: topics.length
            });
        } catch (e) {
            console.error("Topic not loaded: ", e);
        }
    }

    switchPage(offset) {
        const params = {page: this.props.pagination.offsetToPage(offset)};
        this.props.transition.router.stateService.go('app.forum.topicListing', params);
    }

    handleChangeValue(field) {
        return (event) => this.setState({[field]: event.target.value});
    }


    handleSearch(query) {
        // todo: search
    }

    render() {
        const {topics} = this.state;
        const {pagination, classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h1">Topics</Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <SearchField id="topic-search" onSearch={(searchQuery) => this.handleSearch(searchQuery)}
                                     query={this.state.searchQuery}
                                     onChange={(searchQuery) => this.setState({searchQuery})}/>
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={4}>
                        <UISref to="app.forum.createTopic">
                            <Button variant="contained" color="primary">Create topic</Button>
                        </UISref>
                    </Grid>
                </Grid>
                <div className={classes.topics}>
                    {topics.map((topic, index) => {
                        const oddClass = index % 2 === 0 ? classes.odd : '';
                        return <TopicRow key={topic.id} topic={topic} classes={[classes.topicRow, oddClass]}/>
                    })}
                </div>
                <div className={classes.pagination}>
                    <Pagination limit={pagination.limit} offset={pagination.offset} total={this.state.totalTopics}
                                onClick={(event, offset) => this.switchPage(offset, event)}/>
                </div>
            </div>
        );
    }
}

class TopicRow extends React.Component {
    render() {
        const {topic} = this.props;
        let {classes} = this.props;
        if (!classes) {
            classes = [];
        }

        return (
            <UISref to="app.forum.topicView" params={{topicId: topic.id}}>
                <Grid container className={classes.join(' ')}>
                    <Grid item xs={2}>
                        <span>{topic.category}</span>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption">{topic.title}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <DateControl value={topic.lastUpdate}/>
                    </Grid>
                </Grid>
            </UISref>
        );
    }
}

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    heading: {

    },
    topics: {
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        minHeight: 200,
        borderColor: 'dimgray',
        borderStyle: 'solid',
        borderWidth: 0,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    pagination: {
        align: 'end',
    },
    topicRow: {
        backgroundColor: '#EEE',
        cursor: 'pointer',
    },
    odd: {
        backgroundColor: '#CCC'
    }
});

export default withStyles(styles)(TopicListing);


