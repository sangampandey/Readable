import {FETCH_CATEGORIES,} from "../util/constants";

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
}