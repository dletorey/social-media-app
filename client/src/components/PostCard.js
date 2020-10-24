import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);
  function likePost() {
    console.log('Like post!!');
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
        <Button color='red' basic>
            <Icon name='heart' />
        </Button>
        <Label basic color='red' pointing='left'>
            {likeCount}
        </Label>
        </Button>
        <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
          <Button color='blue' basic>
              <Icon name='comment alternate outline' />
          </Button>
          <Label basic color='blue' pointing='left'>
              {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as="div" color="red" onClick={() => console.log('Delete post')}>
            <Icon name="trash" />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;