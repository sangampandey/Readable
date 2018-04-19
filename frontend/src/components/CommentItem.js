import React, {Component} from 'react';
import {Card, CardContent, Column, Columns, Content, Heading, Icon} from 'bloomer';
import {getDate} from "../util/helpers_util";
import CommentEdit from './CommentEdit';

class CommentItem extends Component {

    state = {
        isEdit: false
    };

    render() {
        const {commentData, deleteComment, upvote, downvote, editComment} = this.props;

        const _toggleEdit = () => {
            this.setState({
                isEdit: !this.state.isEdit
            })
        };

        return (
            <div style={{marginBottom: 10}}>
                <Card>
                    <CardContent>
                        {
                            !this.state.isEdit ?
                                <Content>

                                    <Columns>
                                        <Column isSize={8}>
                                            <small>Published {getDate(commentData.timestamp)} by {commentData.author}</small>
                                        </Column>

                                        <Column isSize={1}>
                                            <Heading>
                                                <a onClick={_toggleEdit}>
                                                    <Icon isSize="small"
                                                          className="fa fa-edit"/>
                                                </a>
                                            </Heading>
                                        </Column>

                                        <Column isSize={1}>
                                            <Heading>
                                                <a onClick={() => {
                                                    deleteComment(commentData.id)
                                                }}><Icon isSize="small"
                                                         className="fa fa-trash-alt"/></a>
                                            </Heading>
                                        </Column>

                                    </Columns>

                                    <Heading>Score is {commentData.voteScore}</Heading>
                                    <p>{commentData.body}</p>
                                    <Columns>

                                        <Column isSize={1}>
                                            <Heading>
                                                <a onClick={() => {
                                                    upvote(commentData.id)
                                                }}><Icon isSize="small"
                                                         className="fa fa-thumbs-up"/></a>

                                            </Heading>
                                        </Column>

                                        <Column isSize={1}>
                                            <Heading>
                                                <a onClick={() => {
                                                    downvote(commentData.id)
                                                }}><Icon isSize="small"
                                                         className="fa fa-thumbs-down"/></a>
                                            </Heading>
                                        </Column>

                                    </Columns>
                                </Content>
                                :
                                <Content>
                                    <CommentEdit editComment={editComment} commentData={commentData}
                                                 toggleEdit={_toggleEdit}/>
                                    <br/><br/>
                                </Content>
                        }
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default CommentItem;