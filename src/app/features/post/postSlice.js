import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk(
    'post/fetchPost',
    async () => {
        try {
            const response = await axios.get(POST_URL);
            return  [...response.data]
        } catch (error) {
            return error.message
        }
    }
)

export const addNewPost = createAsyncThunk(
    'post/addNewPost',
    async (initialPost) => {
        try {
            const response = await axios.post(POST_URL, initialPost);
            return  response.data
        } catch (error) {
            return error.message
        }
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.posts.push(action.payload)
            },
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: Number(nanoid()),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsup: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'

                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsup: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });

                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsup: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                state.posts.push(action.payload)
            })
    }
})

export const selectAllPosts = (state) => state.post.posts;
export const getPostStatus = (state) => state.post.state;
export const getPostError = (state) => state.post.error;

export const { addPost, reactionAdded } = postSlice.actions;

export default postSlice.reducer;