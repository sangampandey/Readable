import axios from 'axios';
import {API_ENDPOINT, AUTH_HEADERS} from "./constants";
axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

//Category
export const fetchCategories = () => axios.get(`${API_ENDPOINT}/categories`);
export const fetchCategoryByPosts = (category) => axios.get(`${API_ENDPOINT}/${category}/posts`);

//Post
export const fetchPosts = () => axios.get(`${API_ENDPOINT}/posts`);
export const createPost = (data) => axios.post(`${API_ENDPOINT}/posts`,data);
export const fetchPostByID = (post_id) => axios.get(`${API_ENDPOINT}/posts/${post_id}`);
export const voteOnPost = (post_id,data) => axios.post(`${API_ENDPOINT}/posts/${post_id}`,data);
export const editPost = (post_id,data) => axios.put(`${API_ENDPOINT}/posts/${post_id}`,data);
export const deletePost = (post_id) => axios.delete(`${API_ENDPOINT}/posts/${post_id}`);

//Comment
export const fetchComments = (post_id) => axios.get(`${API_ENDPOINT}/posts/${post_id}/comments`);
export const createComment = (data) => axios.post(`${API_ENDPOINT}/comments`,data);
export const fetchCommentByID = (comment_id) => axios.get(`${API_ENDPOINT}/comments/${comment_id}`);
export const voteOnComment = (comment_id,option) => axios.post(`${API_ENDPOINT}/comments/${comment_id}`,option);
export const editComment = (comment_id,data) => axios.put(`${API_ENDPOINT}/comments/${comment_id}`,data);
export const deleteComment = (comment_id) => axios.delete(`${API_ENDPOINT}/comments/${comment_id}`);