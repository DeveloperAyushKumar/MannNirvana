import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from "@/src/utils/getBaseURL";

const baseQuery = fetchBaseQuery({
    baseUrl:`${getBaseURL()}/posts`,
    credentials:'include',
    prepareHeaders:(Headers)=>{
        const token = localStorage.getItem('token')
        if(token){
            Headers.set('Authorization',`Bearer ${token}`)
        }
        return Headers;
    }
    

})
const postsApi=createApi({
    reducerPath:"postsApi",
    baseQuery,
    tagTypes:["Posts","Post"],
    endpoints:(builder)=>({
        fetchAllPosts:builder.query({
            query:()=>'/',
            providesTags:["Posts"]
        }),
        fetchPostById:builder.query({
            query:(id)=>`/${id}`,
            providesTags:(result,error,id)=>[{type:"Post",id}],
        }),
        addPost:builder.mutation({
            query:(newPost)=>({
                url:`/create-post`,
                method:"POST",
                body:newPost,
                headers:{
                    'Content-Type':'application/json',
                }
            }),
            invalidatesTags:["Posts"]
        }),
        updatePost:builder.mutation({
            query:({id,...rest})=>({
                url:`/edit/${id}`,
                method:"PUT",
                body:rest,
                headers:{
                    'Content-Type':'application/json',
                }
            }),
            invalidatesTags:["Posts"]
        }),
        deletePost:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
        }),
        addComment:builder.mutation({
            query:({id,...rest})=>({
                url:`/add-comment/${id}`,
                method:"POST",
                body:rest,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id },"Posts"]
    }),
    likePost:builder.mutation({
        query:({id,...res})=>({
            url:`/like-post/${id}`,
            method:"POST",
            body:res,
            
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Post", id },"Posts"]
    }),

})
})
export const {useFetchAllPostsQuery,useAddPostMutation,useDeletePostMutation,useFetchPostByIdQuery,useUpdatePostMutation,useAddCommentMutation,useLikePostMutation}=postsApi
export default postsApi