import React from 'react';
import gql from 'graphql-tag';

function SinglePost(props){
    const postId = props.match.params.postId;

    return ()
};

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            username
            createdAt
            id
            body
            comments{
            id
            createdAt
            username
            body
            }
            likes{
            id
            username
            createdAt
            }
            likeCount
            commentCount
        }
    }
`;

export default SinglePost;