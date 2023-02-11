import React from 'react'
import { useSelector } from 'react-redux';
import { allAppUsers } from '../user/userSlice';

const PostAuthor = ({ userId }) => {
    const users = useSelector(allAppUsers);
    const author = users.find(user => user.id === userId)
    
    return (
        <span>
            by {author ? author.name : 'Unknown author'}
        </span>
    )
}

export default PostAuthor