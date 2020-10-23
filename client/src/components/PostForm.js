import React from 'react';
import { Form, Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useForm } from '../util/hooks'
import { gql } from 'graphql-tag';

function PostForm(){

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create new post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Type here…"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type="submit" color="red">
                    Create
                </Button>
            </Form.Field>
        </Form>
    )
};

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likeCount
            likes {
                id
                username
                createdAt
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

export default PostForm