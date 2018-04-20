import _ from 'lodash';
import {
    CREATE_POST,
    DELETE_POST,
    EDIT_POST,
    FETCH_CATEGORY_POSTS,
    FETCH_POST,
    FETCH_POSTS,
    VOTE_POST
} from "../actions/types";
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload;
        case CREATE_POST:
            return action.payload;
        case FETCH_POST:
            return action.payload;
        case EDIT_POST:
            return {
                ...state,
                [action.payload.data.id]: action.payload
            }
        case DELETE_POST:
            return _.omit(state, action.payload);
        case VOTE_POST:
            return {
                ...state,
                [action.payload.data.id]: action.payload
            }
        case FETCH_CATEGORY_POSTS:
            return action.payload;
        default:
            return state;
    }
}