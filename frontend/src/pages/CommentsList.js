import React, {Component} from 'react';
import * as actions from "../actions";
import {Box, Button, Column, Columns, Container} from 'bloomer';
import _ from "lodash";
import {connect} from "react-redux";
import {Title} from 'bloomer';
import ReactPlaceholder from 'react-placeholder';
import CommentItem from "../components/CommentItem";
import {getPostByID} from "../util/helpers_util";
import PostItem from "../components/PostItem";
import CommentNew from '../components/CommentNew';
import Notfound from "../pages/NotFound";
import CategoriesList from "../components/CategoriesList";

class CommentsList extends Component {

    state = {
        active: 'all',
    };

    componentWillMount() {
        this.setState({
            active: this.props.match.params.category,
        });

        const {fetchComments, postID, fetchPosts,fetchCategories} = this.props;
        fetchCategories();
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
            categories,
            createComment,
            postID,
            postData,
            fetchPosts,
            fetchComments,
            fetchCategoryPosts
        } = this.props;

        const fetchPost = (category) => {
            this.setState({
                active: category
            }, () => {
                if (this.state.active !== "all") {
                    fetchCategoryPosts(category)
                } else {
                    fetchPosts();
                }
            });
        };

        const _createComment = (data) => {
            createComment(data, () => {
                fetchComments(postID);
                fetchPosts();
            });
        };

        const _deleteButtonPress = (id) => {
            this.props.deletePost(id, () => {
                fetchPosts();
            });
        };

        const _upvote = (id) => {
            this.props.voteForPost(id, 'upVote', () => {
                fetchPosts();
            });
        };

        const _downvote = (id) => {
            this.props.voteForPost(id, 'downVote', () => {
                fetchPosts();
            });
        };

        return (
            <div>
                {
                    (postData.hasOwnProperty("id")) ? <Columns isCentered>
                            <Column isSize='1/3'>
                                <CategoriesList active={this.state.active} categories={categories} fetchPost={fetchPost}/>
                            </Column>
                            <Column isSize='2/3'>
                                <div>
                                    <PostItem upvote={_upvote} downvote={_downvote} deletePost={_deleteButtonPress} key={postData.id} data={postData}
                                              showAction={true}/>
                                    <Title isSize={6} style={{margin: 0}}>Comments</Title><br/>
                                    {this._renderCommentsList()}
                                    <Title isSize={6} style={{margin: 0}}>Add Comments</Title><br/>
                                    <CommentNew postID={postData.id} createComment={_createComment}/>
                                </div>
                            </Column>
                        </Columns>
                         : <Notfound/>
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    if (state.hasOwnProperty("posts") && state.posts.hasOwnProperty("data")) {
        const posts = _.filter(state.posts.data, post => !post.deleted);
        const comments = _.filter(state.comments.data, comment => !comment.deleted);
        const postData = getPostByID(posts, ownProps.match.params.id);

        if (state.hasOwnProperty("categories") && state.categories.hasOwnProperty("data") && state.categories.data.hasOwnProperty("categories")) {
            return {
                categories: state.categories.data.categories,
                comments: comments,
                posts: posts,
                postID: ownProps.match.params.id,
                category: ownProps.match.params.category,
                postData: postData
            }
        }else{
            return {
                categories: null,
                comments: comments,
                posts: posts,
                postID: ownProps.match.params.id,
                category: ownProps.match.params.category,
                postData: postData
            }
        }
    }

    return {
        categories:null,
        comments: null,
        posts: null,
        postID: ownProps.match.params.id,
        category: ownProps.match.params.category,
        postData: {},
    };
}

export default connect(mapStateToProps,actions)(CommentsList);