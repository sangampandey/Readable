import _ from 'lodash';
import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    FETCH_COMMENT,
    FETCH_COMMENTS,
    VOTE_FOR_COMMENT
} from "../actions/types";

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_COMMENTS:
            return action.payload;
        case CREATE_COMMENT:
            return action.payload;
        case FETCH_COMMENT:
            return action.payload;
        case EDIT_COMMENT:
            return {
                ...state,
                [action.payload.data.id]: action.payload
            }
        case DELETE_COMMENT:
            return _.omit(state, action.payload);
        case VOTE_FOR_COMMENT:
            return {
                ...state,
                [action.payload.data.id]: action.payload
            }
        default:
            return state;
    }
}