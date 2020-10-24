import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function LikeButton({ post: { id, likeCount, likes}}){
    <Button as='div' labelPosition='right' onClick={likePost}>
        <Button color='red' basic>
            <Icon name='heart' />
        </Button>
        <Label basic color='red' pointing='left'>
            {likeCount}
        </Label>
    </Button>
};

export default LikeButton