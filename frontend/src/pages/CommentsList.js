import React, {Component} from 'react';
import {
    createComment,
    deleteComment,
    editComment,
    fetchComment,
    fetchComments,
    fetchPosts,
    voteForComment
} from "../actions";
import _ from "lodash";
import {connect} from "react-redux";
import {Title} from 'bloomer';
import ReactPlaceholder from 'react-placeholder';
import CommentItem from "../components/CommentItem";
import {getPostByID} from "../util/helpers_util";
import PostItem from "../components/PostItem";
import CommentNew from '../components/CommentNew';

class CommentsList extends Component {

    componentWillMount() {
        const {fetchComments, postID, fetchPosts} = this.props;
        fetchComments(postID);
        fetchPosts();
    }

    _renderCommentsList() {

        const {
            deleteComment,
            fetchComments,
            comments,
            editComment,
            postID,
            category,
            fetchPosts
        } = this.props;

        const _editComment = (id, data) => {
            editComment(id, data, () => {
                fetchComments(postID);
                fetchPosts();
            });
        };

        const _deleteButtonPress = (id) => {
            deleteComment(id, () => {
                fetchComments(postID);
            });
        };

        const _upvote = (id) => {
            this.props.voteForComment(id, {'option': 'upVote'}, () => {
                fetchComments(postID);
            });
        };

        const _downvote = (id) => {
            this.props.voteForComment(id, {'option': 'downVote'}, () => {
                fetchComments(postID);
            });
        };

        if (comments) {
            return _.map(comments, comment => <CommentItem upvote={_upvote} downvote={_downvote}
                                                           deleteComment={_deleteButtonPress} key={comment.id}
                                                           category={category} commentData={comment}
                                                           editComment={_editComment}/>);
        }

        return (
            <div>
                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} rows={6}>
                    <div>Loading...</div>
                </ReactPlaceholder>
                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} rows={6}>
                    <div>Loading...</div>
                </ReactPlaceholder>
                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} rows={6}>
                    <div>Loading...</div>
                </ReactPlaceholder>
                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} rows={6}>
                    <div>Loading...</div>
                </ReactPlaceholder>
                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} rows={6}>
                    <div>Loading...</div>
                </ReactPlaceholder>
                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} rows={6}>
                    <div>Loading...</div>
                </ReactPlaceholder>
            </div>
        );
    }

    render() {
        const {
            createComment,
            postID,
            postData,
            fetchPosts,
            fetchComments
        } = this.props;

        const _createComment = (data) => {
            createComment(data, () => {
                fetchComments(postID);
                fetchPosts();
            });
        };

        return (
            <div>
                <PostItem upvote={false} downvote={false} deletePost={false} key={postData.id} data={postData}
                          showAction={false}/>
                <Title isSize={6} style={{margin: 0}}>Comments</Title><br/>
                {this._renderCommentsList()}
                <Title isSize={6} style={{margin: 0}}>Add Comments</Title><br/>
                <CommentNew postID={postData.id} createComment={_createComment}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    if (state.hasOwnProperty("posts") && state.posts.hasOwnProperty("data")) {
        const posts = _.filter(state.posts.data, post => !post.deleted);
        const comments = _.filter(state.comments.data, comment => !comment.deleted);
        const postData = getPostByID(posts, ownProps.match.params.post);
        return {
            comments: comments,
            posts: posts,
            postID: ownProps.match.params.post,
            category: ownProps.match.params.category,
            postData: postData
        };
    }

    return {
        comments: null,
        posts: null,
        postID: ownProps.match.params.post,
        category: ownProps.match.params.category,
        postData: {},
    };
}

export default connect(mapStateToProps, {
    fetchComments, createComment, fetchComment, voteForComment, editComment, deleteComment, fetchPosts
})(CommentsList);