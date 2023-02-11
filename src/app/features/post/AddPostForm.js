import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postSlice'
import { allAppUsers } from '../user/userSlice';

const AddPostForm = () => {
    const [ title, setTitle ] = React.useState("")
    const [ content, setContent ]= React.useState("");
    const [ userId, setUserId ]= React.useState("");
    const [ addRequestStatus, setAddRequestStatus ]= React.useState("idle");

    const users = useSelector(allAppUsers)
    const dispatch = useDispatch();

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onAuthorChange = e => setUserId(e.target.value);
    
    const canSave = [title, content, userId].every(Boolean) &&
        addRequestStatus === 'idle';

    const savePost = () => {
        if(canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(
                    addNewPost({
                        title, 
                        body: content, 
                        userId
                    })
                ).unwrap();

                setTitle('')
                setContent('')
                setUserId('')
            } catch (error) {
                console.log('Failed to save post', error)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <div>
            <h2>Add New Post</h2>
            <form>
                <label htmlFor='postTitle'>Post Title:</label>
                <input 
                    type={'text'}
                    id={'postTitle'}
                    name={'postTitle'}
                    value={title}
                    onChange={onTitleChange}
                />
                
                <label htmlFor='postTitle'>Post Content:</label>
                <textarea 
                    id={'postContent'}
                    name={'postContent'}
                    value={content}
                    onChange={onContentChange}
                />
                <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                    <option value=''></option>
                    {userOptions}
                </select>
                <button 
                    type={'button'} 
                    onClick={savePost}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </div>
    )
}

export default AddPostForm