import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {fetchCategories, fetchCategoryPosts, fetchPosts} from '../actions';
import {
    Button,
    Column,
    Columns,
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Icon,
    Title
} from 'bloomer';
import CategoriesList from "../components/CategoriesList";
import PostItem from "../components/PostItem";
import ReactPlaceholder from 'react-placeholder';

class Post extends Component {

    state = {
        active: 'all',
        sort: 'Sort by',
        isDropdownActive: false
    };

    componentWillMount() {
        this.props.fetchCategories();
        this.props.fetchPosts();
    }

    _renderPost() {

        const {posts, postsSorted, fetchPosts} = this.props;

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

        if (posts) {
            const orderedPosts = _.sortBy(posts, postsSorted).reverse();
            return _.map(orderedPosts, post => < PostItem upvote={_upvote} downvote={_downvote}
                                                          deletePost={_deleteButtonPress} key={post.id} data={post}
                                                          showAction={true}
            />);
        }

        return (<
            div>
            <ReactPlaceholder showLoadingAnimation={true} type='text'
                              ready={false} rows={6}>
                <div> Loading...</div>
            </ReactPlaceholder> <ReactPlaceholder showLoadingAnimation={true} type='text'
                                                  ready={false} rows={6}>
            <div> Loading...</div>
        </ReactPlaceholder> <ReactPlaceholder showLoadingAnimation={true} type='text'
                                              ready={false} rows={6}>
            <div> Loading...</div>
        </ReactPlaceholder>
        </div>);
    }

    render() {

        const {categories, fetchCategoryPosts, fetchPosts, sortedPosts} = this.props;

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

        const sortBy = (value) => {
            this.setState({
                sort: (value === "voteScore") ? "Votes" : "Date"
            }, () => {
                sortedPosts(value);
            });
        };

        return (<div>
                <Columns isCentered>
                    <Column isSize='1/3'>
                        <CategoriesList active={this.state.active} categories={categories} fetchPost={fetchPost}
                        /> </Column> <Column isSize='2/3'>
                    <Columns isCentered style={{alignItems: 'center'}}>
                        <Column isSize='1/2'>
                            <Title isSize={3}> Posts </Title> <Dropdown isActive={this.state.isDropdownActive} onClick={
                            () => {
                                this.setState({
                                    isDropdownActive: !this.state.isDropdownActive
                                })
                            }
                        }>
                            <DropdownTrigger>
                                <Button isOutlined aria-haspopup="true" aria-controls="dropdown-menu">
                                    <span> {this.state.sort} </span> <
                                    Icon icon="angle-down"
                                         isSize="small"/>
                                </Button> </DropdownTrigger> <DropdownMenu>
                            <DropdownContent>
                                <DropdownItem onClick={
                                    () => sortBy("voteScore")
                                }> Votes </DropdownItem> <DropdownItem onClick={
                                () => sortBy("timestamp")
                            }> Date </DropdownItem> </DropdownContent> </DropdownMenu> </Dropdown> </Column> <Column
                        isSize='1/2'>
                        <Link to="posts/new">
                            <Button isColor='info'
                                    render={
                                        props => < Column hasTextAlign='centered'>
                                            < p {...props} > Create Post </p>
                                        </Column>}
                            /> </Link> </Column> </Columns>
                    <hr/>
                    {this._renderPost()} </Column> </Columns></div>
        );
    }
}

function mapStateToProps(state,ownParams) {

    console.log(ownParams);

    if (state.hasOwnProperty("categories") && state.categories.hasOwnProperty("data") && state.categories.data.hasOwnProperty("categories")) {
        if (state.hasOwnProperty("posts") && state.posts.hasOwnProperty("data")) {
            const posts = _.filter(state.posts.data, post => !post.deleted);
            const {sortedPosts} = state;
            let _posts = posts;
            if (ownParams.match.params.hasOwnProperty("category")) {
                _posts = _.filter(posts,{category:(ownParams.match.params.category).toLowerCase()})
            }
            return {categories: state.categories.data.categories, posts: _posts, postsSorted: sortedPosts}
        } else {
            return {categories: state.categories.data.categories, posts: null}
        }
    }
    return {categories: null, posts: null};
}

export default connect(mapStateToProps,actions)(Post);