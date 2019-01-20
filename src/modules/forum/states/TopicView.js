import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {withStyles} from "@material-ui/core/styles";
import * as icons from "@material-ui/icons";
import Grid from "@material-ui/core/Grid/Grid";

import rest from "../../../services/restInstance";

class TopicView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topic: null,
        };
    }

    async componentDidMount() {
        console.log(this.props);
        try {
            const topic = await rest.get("forum/topics/priroda");
            this.setState({topic: topic});
        } catch (e) {
            console.error(e)
        }

    }


    render() {
        if(!this.state.topic) {
            return <Typography>Loading...</Typography>
        }

        const {topic} = this.state;
        const {posts} = topic;

        return (
            <div>
                <Typography variant={"h1"}>{topic.title}</Typography>
                <Grid container>
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        <Typography variant="body1" dangerouslySetInnerHTML={{__html: topic.description}}/>
                        {posts.map((post) => <PostViewStyled key={post.id} post={post}/>)}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const postStyles = (theme) => ({
    root: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    userIndicator: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        marginLeft: theme.spacing.unit,
    },
    postActions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    postContent: {
        border: '#DDD solid 0px',
        borderTopWidth: '1px',
    },
});

class PostView extends React.Component {
    render() {
        const {post, classes} = this.props;

        return (
            <Card className={classes.root} square={true}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={7} className={classes.userIndicator}>
                            <Avatar aria-label="Recipe">{post.author.substr(0, 1).toUpperCase()}</Avatar>
                            <Typography className={classes.userName}>{post.author}</Typography>
                        </Grid>
                        <Grid item xs={5} className={classes.postActions}>
                            <IconButton>
                                <icons.MoreVert fontSize="small"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <div className={classes.postContent}>
                        <Typography component="p" dangerouslySetInnerHTML={{__html: post.content}}/>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

const PostViewStyled = withStyles(postStyles)(PostView);

export default TopicView;
