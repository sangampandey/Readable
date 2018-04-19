import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bulma/css/bulma.css'
import "react-placeholder/lib/reactPlaceholder.css"
import NotFound from "./pages/NotFound";
import Post from "./pages/Posts";
import PostNew from "./pages/PostNew";
import PostEdit from "./pages/PostEdit";
import CommentsList from "./pages/CommentsList";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact component={Post}/>
                        <Route path="/posts/new" exact component={PostNew}/>
                        <Route path="/:category" exact component={Post}/>
                        <Route path="/post/edit/:id" children={props => <PostEdit {...props}/>} />
                        <Route path="/:category/post/:post/comments" exact component={CommentsList}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;