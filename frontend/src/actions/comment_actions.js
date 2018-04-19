import * as ReadbleAPIUtil from '../util/api_util';
import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    FETCH_COMMENT,
    FETCH_COMMENTS,
    VOTE_FOR_COMMENT
} from "../util/constants";

export const receiveComments = comments => ({
    type: FETCH_COMMENTS,
    payload: comments
});

export const fetchComments = (post_id) => dispatch => (
    ReadbleAPIUtil
        .fetchComments(post_id)
        .then(posts => dispatch(receiveComments(posts)))
);

export const receiveCreateComment = comment => ({
    type: CREATE_COMMENT,
    payload: comment
});

export const createComment = (data, callback) => dispatch => (
    ReadbleAPIUtil
        .createComment(data)
        .then(posts => dispatch(() => {
            receiveCreateComment(posts);
            callback();
        }))
);

export const receiveComment = comment => ({
    type: FETCH_COMMENT,
    payload: comment
});

export const fetchComment = (comment_id, callback) => dispatch => (
    ReadbleAPIUtil
        .fetchCommentByID(comment_id)
        .then(posts => dispatch(() => {
            receiveComment(posts);
            callback();
        }))
);

export const receiveVoteForComment = comment => ({
    type: VOTE_FOR_COMMENT,
    payload: comment
});

export const voteForComment = (comment_id, data,callback) => dispatch => (
    ReadbleAPIUtil
        .voteOnComment(comment_id, data)
        .then(posts => dispatch(()=>{
            receiveVoteForComment(posts)
            callback()
        }))
);

export const receiveEditComment = comment => ({
    type: EDIT_COMMENT,
    payload: comment
});

export const editComment = (id, data, callback) => dispatch => (

    ReadbleAPIUtil
        .editComment(id, data)
        .then(comment => dispatch(() => {
            receiveEditComment(comment);
            callback();
        }))
);

export const receiveDeleteComment = comment => ({
    type: DELETE_COMMENT,
    payload: comment
});

export const deleteComment = (id,callback) => dispatch => (

    ReadbleAPIUtil
        .deleteComment(id)
        .then(comment => dispatch(() => {
            receiveDeleteComment(comment)
            callback()
        }))
);