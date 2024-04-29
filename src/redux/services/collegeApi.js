import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const collegeApi = createApi(
    {
        reducerPath: 'collegeApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030' }),
        endpoints: (builder) => ({

            getStudents: builder.query({
                query: (name_of_list) => name_of_list,
                providesTags: ['Students']
            }),

            createStudent: builder.mutation({
                query: ({url , student}) => ({
                    url: url,
                    method: 'POST',
                    body: student
                }),
                invalidatesTags: ['Students']
            }),

            updateStudent: builder.mutation({
                query: ({url ,id , student}) => ({
                    url: `${url}/${id}`,
                    method: 'PUT',
                    body: student
                }),
                invalidatesTags: ['Students']
            }),

            deleteStudent: builder.mutation({
                query: ({url , id}) => ({
                    url: `${url}/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Students']
            })

        })
    }
)

export const { useGetStudentsQuery, useCreateStudentMutation , useUpdateStudentMutation , useDeleteStudentMutation} = collegeApi;