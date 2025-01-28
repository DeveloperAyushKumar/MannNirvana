// /* React-specific entry point that automatically generates
//    hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseURL from '../../../utils/getBaseURL'
const baseQuery=fetchBaseQuery({
    baseUrl:`${getBaseURL()}/api/books`,
    credentials:'include',
    prepareHeaders:(Headers)=>{
        const token =localStorage.getItem('token')
        if(token){
            Headers.set('Authorization',`Bearer${token}`)
        }
        return Headers;
    }

})
const booksApi =createApi({
    reducerPath:"booksApi",  // provides redcuer name in store 
    baseQuery,
    tagTypes:['Books'], // categories the data for caching 
    endpoints:(builder)=>({
        fetchAllBooks:builder.query({ // use query for get requests
            query:()=>'/',
            providesTags:["Books"] // put data in Books for caching 
        }),
        fetchBookById: builder.query({
            query:(id)=>`/${id}`,
            providesTags:(result,error,id)=>[{type:"Books",id}],


        }),
        addBook :builder.mutation({
            query:(newBook)=>({
                url:`/create-book`,
                method:"POST",
                body :newBook,
            })
        }),
        updateBook :builder.mutation({
            query:({id,...rest})=>({
                url:`/edit/${id}`,
                method:"PUT",
                body :rest,
                headers:{
                    'Content-Type':'application/json',
                }
            }),
            invalidatesTags:["Books"]
        }),
        deleteBook:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Books"]
        })
    })
})
export const {useFetchAllBooksQuery,useAddBookMutation,useDeleteBookMutation,useFetchBookByIdQuery,useUpdateBookMutation}= booksApi
export default booksApi