import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react' 

function Home() {
    const { loading, data: { getPosts: posts} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h2>Loading Posts…</h2>
                ) : (
                    posts && posts.map(post => (
                        <Grid.Column key={post.id}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id body createdAt username likeCount commentCount
            likes{
                username createdAt
            }
            comments{
                id username createdAt body
            }
        }
    }
`

export default Home; 