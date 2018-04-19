import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import uuidv1 from "uuid/v1";
import {renderField} from "../util/helpers_util";
import {Button, Column, Columns} from 'bloomer';

class CommentNew extends Component {

    _handleInitialize() {
        const initData = {
            "body": "",
            "author": ""
        };
        this.props.initialize(initData)
    }

    onSubmit(values) {
        const {body, author} = values;

        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            body,
            author,
            parentId: this.props.postID
        };

        this._handleInitialize();
        
        this.props.createComment(data);
    }

    render() {
        const {
            handleSubmit
        } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Comment"
                    name="body"
                    component={renderField}
                />
                <Field
                    label="Author"
                    name="author"
                    component={renderField}
                />
                <Columns isPulled={"left"}>
                    <Column isSize='1'>
                        <Button type="submit" isColor='info'>Submit</Button>
                    </Column>
                    <Column isSize='1'>
                        <Button isColor='default'><Link to="/" className="btn btn-danger">Cancel</Link></Button>
                    </Column>
                </Columns>
            </form>
        );
    }
}

export default reduxForm({
    form: 'CommentNew'
})(
    connect(null)(CommentNew)
);
