import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

function SinglePost(props){
    const postId = props.match.params.postId;
    console.log(postId);
    const {data: { getPost }} = useQuery(FETCH_POSTS_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;
    if(!);
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