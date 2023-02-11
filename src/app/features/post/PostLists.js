import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, getPostError, getPostStatus, fetchPosts } from './postSlice';
import PostExcerpt from './PostExcerpt';

const PostLists = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostStatus);
    const error = useSelector(getPostError);

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (posts) {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    React.useEffect(() => {
        if(postStatus !== 'loading') {
            dispatch((fetchPosts())) 
        }
    }, [postStatus, dispatch])

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostLists