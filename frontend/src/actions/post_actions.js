import * as ReadbleAPIUtil from '../util/api_util';
import {
    CREATE_POST,
    DELETE_POST,
    EDIT_POST,
    FETCH_POST,
    FETCH_POSTS,
    POST_SORT_ORDER,
    VOTE_POST
} from "../util/constants";


export const receivePosts = posts => ({
    type: FETCH_POSTS,
    payload: posts
});

export const fetchPosts = () => dispatch => (
    ReadbleAPIUtil
        .fetchPosts()
        .then(posts => dispatch(receivePosts(posts)))
);

export const receivePost = post => ({
    type: FETCH_POST,
    payload: post
});

export const fetchPost = (post_id) => dispatch => (
    ReadbleAPIUtil
        .fetchPostByID(post_id)
        .then(post => dispatch(receivePost(post)))
);

export const receiveCreatePost = post => ({
    type: CREATE_POST,
    payload: post
});

export const createPost = (data,callback) => dispatch => (

    ReadbleAPIUtil
        .createPost(data)
        .then(post => dispatch(()=>{
            receiveCreatePost(post);
            callback();
        }))
);

export const receiveEditPost = post => ({
    type: EDIT_POST,
    payload: post
});

export const editPost = (id,data,callback) => dispatch => (

    ReadbleAPIUtil
        .editPost(id, data)
        .then(post => dispatch(()=>{
            receiveEditPost(post);
            callback();
        }))
);

export const receiveDeletePost = post => ({
    type: DELETE_POST,
    payload: post
});

export const deletePost = (id,callback) => dispatch => (

    ReadbleAPIUtil
        .deletePost(id)
        .then(post => dispatch(()=>{
            receiveDeletePost(post)
            callback()
        }))
);

export const receiveVoteForPost = post => ({
    type: VOTE_POST,
    payload: post
});

export const voteForPost = (id, vote,callback) => dispatch => (
    ReadbleAPIUtil
        .voteOnPost(id, {"option":vote})
        .then(post => dispatch(()=>{
            receiveVoteForPost(post);
            callback();
        }))
);

export function sortedPosts(sortType) {
    return {
        type: POST_SORT_ORDER,
        payload: sortType
    }
}