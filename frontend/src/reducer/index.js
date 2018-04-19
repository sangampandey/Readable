import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import CategoriesReducer from './reducer_categories';
import PostReducer from './reducer_posts';
import CommentReducer from './reducer_comments';
import SortedPostReducer from './reducer_posts_sortby';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostReducer,
    comments: CommentReducer,
    sortedPosts: SortedPostReducer,
    form: formReducer
});

export default rootReducer;