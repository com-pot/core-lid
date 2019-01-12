import React from 'react';
import PropTypes from 'prop-types';
import {UISref} from "@uirouter/react";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import TablePagination from "@material-ui/core/TablePagination";

import rest from "../../../services/restInstance";

class TopicListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pagination: {
                count: 0,
                page: Number.parseInt(this.props.$stateParams.page) || 0,
                rpp: 2,
            },
            topics: []
        };
    }

    async componentDidMount() {
        const page = this.props.page || 1;
        const {pagination} = this.state;

        try {
            const topics = await rest.get("forum/topics", {query: {page: page}});

            this.setState({
                pagination: {...pagination, count: topics.length},
                topics: topics.slice(pagination.page * pagination.rpp, (pagination.page + 1) * pagination.rpp),
            });
        } catch (e) {
            console.error("Topic not loaded: ", e);
        }
    }

    handleChangePage(page) {
        this.props.transition.router.stateService.go('app.forum.topicListing', {page: page});
    };

    render() {
        const {pagination, topics} = this.state;

        return (
            <div>
                <h1>Topics</h1>
                {topics.map((topic, index) => {
                    const oddClass = index % 2 === 0 ? this.props.classes.odd : '';
                    return <TopicRow key={topic.id} topic={topic} classes={[oddClass]}/>
                })}
                <table>
                    <tfoot>
                    <tr>
                        <TablePagination page={pagination.page} rowsPerPage={pagination.rpp} count={pagination.count}
                                         onChangePage={(e, page) => this.handleChangePage(page)}
                                         rowsPerPageOptions={[12, 24, 60]}/>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

TopicListing.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        lastUpdate: PropTypes.number
    }))
};

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
                        <Typography>{topic.lastUpdate}</Typography>
                    </Grid>
                </Grid>
            </UISref>
        );
    }
}

const styles = {
    odd: {
        backgroundColor: '#CCC'
    }
};

export default withStyles(styles)(TopicListing);


