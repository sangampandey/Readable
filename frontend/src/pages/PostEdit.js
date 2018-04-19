import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {editPost, fetchPosts} from '../actions';
import {Box, Button, Column, Columns, Container} from 'bloomer';
import {getPostByID} from "../util/helpers_util";

class PostEdit extends Component {

    componentWillMount() {

    }

    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        if (this.props.post) {
            const initData = {
                "title": this.props.post.title,
                "body": this.props.post.body
            };
            this.props.initialize(initData);
        }
    }

    required = value => (value ? undefined : 'Required')

    _renderField = ({
                        input,
                        label,
                        type,
                        meta: {touched, error, warning}
                    }) => (
        <div className="field">
            <label className="label">{label}</label>
            <div>
                <input className="input" {...input} placeholder={label} type={type}/>
                {touched &&
                ((error && <span className="help is-danger">{error}</span>) ||
                    (warning && <span className="help is-warning">{warning}</span>))}
            </div>
        </div>
    );

    onSubmit(values) {
        this.props.editPost(this.props.match.params.id,values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {
            handleSubmit,
        } = this.props;

        return (
            <Box>
                <Container>
                    <h1 className="title">Edit Post</h1><br/>
                </Container>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Title"
                        name="title"
                        type="text"
                        validate={[this.required]}
                        component={this._renderField}
                    />
                    <Field
                        label="Content"
                        name="body"
                        validate={[this.required]}
                        component={this._renderField}
                    />
                    <br/>
                    <Columns isPulled={"left"}>
                        <Column isSize='1'>
                            <Button type="submit" isColor='info'>Update</Button>
                        </Column>
                        <Column isSize='1'>
                            <Button isColor='default'><Link to="/" className="btn btn-danger">Cancel</Link></Button>
                        </Column>
                    </Columns>
                    <br/>
                    <br/>
                </form>
            </Box>
        );
    }
}

function mapStateToProps(state,ownParams) {
    if (state.hasOwnProperty("posts") && state.posts.hasOwnProperty("data")) {
        const post=getPostByID(state.posts.data,ownParams.match.params.id);
        return {post: post};
    }
    return {post: null};
}

export default reduxForm({
    form: 'EditPostForm'
})(
    connect(mapStateToProps, {
        editPost, fetchPosts
    })(PostEdit)
);