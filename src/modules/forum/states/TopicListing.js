import React from 'react';

import {UISref} from "@uirouter/react";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';
import DateControl from '../../generic/components/DateControl'

import rest from "../../../services/restInstance";

class TopicListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        const {topics} = this.state;
        const {pagination, classes} = this.props;

        return (
            <div>
                <Typography variant="h1">Topics</Typography>
                {topics.map((topic, index) => {
                    const oddClass = index % 2 === 0 ? classes.odd : '';
                    return <TopicRow key={topic.id} topic={topic} classes={[classes.topicRow, oddClass]}/>
                })}

                <Pagination limit={pagination.limit} offset={pagination.offset} total={this.state.totalTopics}
                            onClick={(event, offset) => this.switchPage(offset, event)}/>
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
                    <Grid item xs={8}>
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

const styles = {
    topicRow: {
        cursor: 'pointer',
    },
    odd: {
        backgroundColor: '#CCC'
    }
};

export default withStyles(styles)(TopicListing);


