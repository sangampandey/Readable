import _ from 'lodash';
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {capitalize} from "../util/helpers_util";
import {Box, Button, Column, Columns, Container, Label} from 'bloomer';
import uuidv1 from 'uuid/v1';

class PostsNew extends Component {

    required = value => (value ? undefined : 'Required')

    componentWillMount() {
        this.props.fetchCategories();
    }

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


    _renderCategoryFields(field) {
        const {meta: {touched, error, warning}} = field;
        const {categories} = this.props;

        return (
            <div>
                <Label>{field.label}</Label>
                <div className="select">
                    <select  {...field.input} className="form-control">
                        <option value="" className="disabled">Select category</option>
                        {_.map(categories, category => (
                            <option
                                key={category.name}
                                value={category.name}
                            >
                                {capitalize(category.name)}
                            </option>
                        ))}
                    </select>
                </div>
                {touched &&
                ((error && <span className="help is-danger">{error}</span>) ||
                    (warning && <span className="help is-warning">{warning}</span>))}
            </div>
        );
    }

    onSubmit(values) {
        const {title, body, author, category} = values;

        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            title,
            body,
            author,
            category
        };

        this.props.createPost(data, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <Box>
                <Container>
                    <h1 className="title">Create Post</h1><br/>
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
                    <Field
                        label="Author"
                        name="author"
                        validate={[this.required]}
                        component={this._renderField}
                    />
                    <Field
                        name="category"
                        label="Category"
                        validate={[this.required]}
                        component={field => this._renderCategoryFields(field)}
                    />
                    <br/>
                    <Columns isPulled={"left"}>
                        <Column isSize='1'>
                            <Button type="submit" isColor='info'>Submit</Button>
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

function mapStateToProps(state) {
    if (state.hasOwnProperty("categories") && state.categories.hasOwnProperty("data") && state.categories.data.hasOwnProperty("categories")) {
        return {categories: state.categories.data.categories}
    }
    return {categories: null};
}

export default reduxForm({
    form: 'CreatePostForm'
})(
    connect(mapStateToProps, actions)(PostsNew)
);