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

class PostItem extends Component {

    render() {
        const {data, deletePost, upvote, downvote} = this.props;

        const _getDate = (timestamp) => {
            let d = new Date(timestamp);
            return d.toLocaleString();
        };

        return (
            <div style={{marginBottom: 10}}>
                <Card>
                    <CardContent>
                        <Content>
                            <Title isSize={4} style={{margin: 0}}>{data.title}</Title>
                            <small>Published {_getDate(data.timestamp)} by {data.author}</small>
                            <br/>
                            <Heading>Score is {data.voteScore}</Heading>
                            <Tag isColor='light'>{data.category}</Tag>
                            <br/><br/>
                            <p>{data.body}</p>
                            <Columns>
                                <Column isSize={1}>
                                    <Heading>
                                        <Icon isSize="small"
                                              className="fa fa-comments"/>
                                        {data.commentCount}
                                    </Heading>
                                </Column>

                                <Column isSize={1}>
                                    <Heading>
                                        <a onClick={() => {
                                            upvote(data.id)
                                        }}><Icon isSize="small"
                                                 className="fa fa-thumbs-up"/></a>

                                    </Heading>
                                </Column>

                                <Column isSize={1}>
                                    <Heading>
                                        <a onClick={() => {
                                            downvote(data.id)
                                        }}><Icon isSize="small"
                                                 className="fa fa-thumbs-down"/></a>
                                    </Heading>
                                </Column>

                            </Columns>
                        </Content>
                    </CardContent>
                    <CardFooter>
                        <CardFooterItem> <Link to={`/post/edit/${data.id}`}>EDIT</Link></CardFooterItem>
                        <CardFooterItem><a onClick={() => {
                            deletePost(data.id)
                        }}>DELETE</a></CardFooterItem>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default PostItem;