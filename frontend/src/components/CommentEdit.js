import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {renderField} from "../util/helpers_util";
import {Button, Column, Columns} from 'bloomer';

class CommentEdit extends Component {

    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        const initData = {
            "body": this.props.commentData.body,
            "author": this.props.commentData.author
        };
        this.props.initialize(initData)
    }

    onSubmit(values) {
        this.props.editComment(this.props.commentData.id, values);
        this.props.toggleEdit();
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
                        <Button type="submit" isColor='info'>Update</Button>
                    </Column>
                    <Column isSize='1'>
                        <Button isColor='default'>
                            <a onClick={this.props.toggleEdit}>Cancel</a></Button>
                    </Column>
                </Columns>
            </form>
        );
    }
}

export default reduxForm({
    form: 'CommentEdit'
})(
    connect(null)(CommentEdit)
);
