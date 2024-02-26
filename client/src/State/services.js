// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_NODE_SERVER_ADDR,
  }),
  tagTypes: ["Utility", "Task"],
  endpoints: (builder) => ({
    getMachineById: builder.query({
      query: (m_id) => `machine/${m_id}`,
    }),
    createMachine: builder.mutation({
      query: ({ ...post }) => ({
        url: `machine/create`,
        method: "POST",
        body: post,
      }),
    }),
    createUtility: builder.mutation({
      query: ({ ...post }) => ({
        url: `machine/${post.m_id}/utilities/create/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Utility"],
    }),
    getUtilityList: builder.query({
      query: (m_id) => ({
        url: `machine/${m_id}/utilities/list/`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.utilities.map(({ _id }) => ({ type: "Utility", _id })),
              "Utility",
            ]
          : ["Utility"],
    }),
    editUtility: builder.mutation({
      query: ({ m_id, u_id, data }) => ({
        url: `machine/${m_id}/utilities/edit/${u_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Utility", _id: arg.u_id },
      ],
    }),
    createTask: builder.mutation({
      query: ({ m_id, task }) => ({
        url: `machine/${m_id}/tasks/create/`,
        method: "POST",
        body: task,
      }),
    }),
    getTaskList: builder.query({
      query: (m_id) => ({
        url: `machine/${m_id}/tasks/list/`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.tasks.map(({ _id }) => ({ type: "Task", _id })), "Task"]
          : ["Task"],
    }),
    getTask: builder.query({
      query: ({ m_id, t_id }) => ({
        url: `machine/${m_id}/tasks/${t_id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result ? [({ _id }) => ({ type: "Task", _id }), "Task"] : ["Task"],
    }),
    editTask: builder.mutation({
      query: ({ m_id, t_id, data }) => ({
        url: `machine/${m_id}/tasks/edit/${t_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.u_id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMachineByIdQuery,
  useCreateMachineMutation,
  useCreateUtilityMutation,
  useGetUtilityListQuery,
  useEditUtilityMutation,
  useCreateTaskMutation,
  useGetTaskListQuery,
  useGetTaskQuery,
  useEditTaskMutation,
} = api;

// providesTags: (result, error, arg) =>
// result
//   ? [...result.map(({ _id }) => ({ type: "Utility", _id })), "Utility"]
//   : ["Utility"],
