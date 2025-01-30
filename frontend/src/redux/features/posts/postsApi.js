import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";
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
    tagTypes:['Posts'],
    endpoints:(builder)=>({
        fetchAllPosts:builder.query({
            query:()=>'/',
            providesTags:["Posts"]
        }),
        fetchPostById:builder.query({
            query:(id)=>`/${id}`,
            providesTags:(result,error,id)=>[{type:"Posts",id}],
        }),
        addPost:builder.mutation({
            query:(newPost)=>({
                url:`/create-post`,
                method:"POST",
                body:newPost,
            })
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
            invalidatesTags:["Posts"]
        }),
        addComment:builder.mutation({
            query:({id,...rest})=>({
                url:`/add-comment/${id}`,
                method:"POST",
                body:rest,
                invalidatesTags:["Posts"]
        })
    }),
    likePost:builder.mutation({
        query:({id})=>({
            url:`/like-post/${id}`,
            method:"POST",
            invalidatesTags:["Posts"]
        })
    }),

})
})
export const {useFetchAllPostsQuery,useAddPostMutation,useDeletePostMutation,useFetchPostByIdQuery,useUpdatePostMutation,useAddCommentMutation,useLikePostMutation}=postsApi
export default postsApi