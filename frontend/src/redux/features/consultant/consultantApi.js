import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import getBaseURL from '../../../utils/getBaseURL'
const baseQuery=fetchBaseQuery({
    baseUrl:`${getBaseURL()}/consultant`,
    credentials:'include',
    prepareHeaders:(Headers)=>{
        const token =localStorage.getItem('token')
        if(token){
            Headers.set('Authorization',`Bearer${token}`)
        }
        return Headers;
    }

})
const consultnatApi=createApi({
    reducerPath:"consultantApi",
    baseQuery,
    tagTypes:['Consultants'],
    endpoints:(builder)=>({
        fetchAllConsultants:builder.query({
            query:()=>'/',
            providesTags:["Consultants"]
        }),
        fetchConsultantById:builder.query({
            query:(id)=>`/${id}`,
            providesTags:(result,error,id)=>[{type:"Consultants",id}],
        }),
        addConsultant:builder.mutation({
            query:(newConsultant)=>({
                url:`/`,
                method:"POST",
                body:newConsultant,
                invalidatesTags:["Consultants"]
            })
        }),
        // updateConsultant:builder.mutation({
        //     query:({id,...rest})=>({
        //         url:`/edit/${id}`,
        //         method:"PUT",
        //         body:rest,
        //         headers:{
        //             'Content-Type':'application/json',
        //         }
        //     }),
        //     invalidatesTags:["Consultants"]
        // }),
        // deleteConsultant:builder.mutation({
        //     query:(id)=>({
        //         url:`/${id}`,
        //         method:"DELETE"
        //     }),
        //     invalidatesTags:["Consultants"]
        // })
    })
})

export const {useFetchAllConsultantsQuery,useAddConsultantMutation,useFetchConsultantByIdQuery}=consultnatApi;
export default consultnatApi;