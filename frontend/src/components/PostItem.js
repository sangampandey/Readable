import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Card,
    CardContent,
    CardFooter,
    CardFooterItem,
    Column,
    Columns,
    Content,
    Heading,
    Icon,
    Tag,
    Title
} from 'bloomer';
import {getDate} from "../util/helpers_util";

class PostItem extends Component {

    render() {
        const {data, deletePost, upvote, downvote, showAction} = this.props;

        return (
            <div style={{marginBottom: 10}}>
                <Card>
                    <CardContent>
                        <Content>
                            <Title isSize={4} style={{margin: 0}}>{data.title}</Title>
                            <small>Published {getDate(data.timestamp)} by {data.author}</small>
                            <br/>
                            <Heading>Score is {data.voteScore}</Heading>
                            <Tag isColor='light'>{data.category}</Tag>
                            <br/><br/>
                            <p>{data.body}</p>
                            <Columns>
                                <Column isSize={1}>
                                    <Heading>
                                        <Link to={`/${data.category}/${data.id}/comments`}>
                                            <Icon isSize="small"
                                                  className="fa fa-comments"/>
                                        </Link>
                                        {data.commentCount}
                                    </Heading>
                                </Column>

                                {
                                    showAction && <Column isSize={1}>
                                    <Heading>
                                        <a onClick={() => {
                                            upvote(data.id)
                                        }}><Icon isSize="small"
                                                 className="fa fa-thumbs-up"/></a>

                                    </Heading>
                                </Column>
                                }

                                {
                                    showAction && <Column isSize={1}>
                                    <Heading>
                                        <a onClick={() => {
                                            downvote(data.id)
                                        }}><Icon isSize="small"
                                                 className="fa fa-thumbs-down"/></a>
                                    </Heading>
                                    </Column>
                                }

                            </Columns>
                        </Content>
                    </CardContent>
                    {
                        showAction &&
                        <CardFooter>
                            <CardFooterItem> <Link to={`/${data.category}/${data.id}/edit`}>EDIT</Link></CardFooterItem>
                            <CardFooterItem><a onClick={() => {
                                deletePost(data.id)
                            }}>DELETE</a></CardFooterItem>
                        </CardFooter>
                    }
                </Card>
            </div>
        );
    }
}

export default PostItem;