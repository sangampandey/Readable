import * as ReadbleAPIUtil from '../util/api_util';
import {FETCH_CATEGORIES, FETCH_CATEGORY_POSTS} from "../util/constants";

export const receiveCategories = categories => ({
    type: FETCH_CATEGORIES,
    payload:categories
});

export const fetchCategories = () => dispatch => (
    ReadbleAPIUtil
        .fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
);

export const receiveCategoryPost = post => ({
    type: FETCH_CATEGORY_POSTS,
    payload:post
});

export const fetchCategoryPosts = (category) => dispatch => (
    ReadbleAPIUtil
        .fetchCategoryPosts(category)
        .then(posts => dispatch(receiveCategoryPost(posts)))
);