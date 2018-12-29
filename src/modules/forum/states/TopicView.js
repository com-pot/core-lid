import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {withStyles} from "@material-ui/core/styles";
import * as icons from "@material-ui/icons";
import Grid from "@material-ui/core/Grid/Grid";

class TopicView extends React.Component {
    render() {
        const {topic, posts} = this.props;

        return (
            <Grid container>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <div>
                        <Typography variant={"h1"}>{topic.title}</Typography>
                        <Typography variant="body1" dangerouslySetInnerHTML={{__html: topic.description}}/>
                    </div>
                    {posts.map((post) => <PostViewStyled key={post.id} post={post}/>)}
                </Grid>
            </Grid>
        );
    }
}

const postStyles = (theme) => ({
    root: {
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
        border: '#DDD solid',
        borderWidth: '1px 0px',
    },
});

class PostView extends React.Component {
    render() {
        const {post, classes} = this.props;

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6} className={classes.userIndicator}>
                            <Avatar aria-label="Recipe">{post.author.substr(0, 1).toUpperCase()}</Avatar>
                            <Typography className={classes.userName}>{post.author}</Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.postActions}>
                            <IconButton>
                                <icons.MoreVert/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <div className={classes.postContent}>
                        <Typography component="p" dangerouslySetInnerHTML={{__html: post.content}}/>
                    </div>
                </CardContent>

                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <icons.Favorite/>
                    </IconButton>
                    <IconButton aria-label="Share">
                        <icons.Share/>
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

const PostViewStyled = withStyles(postStyles)(PostView);

export default TopicView;
