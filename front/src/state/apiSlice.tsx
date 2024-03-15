// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MachineCreateData, Receipe } from "../types/ReceipeTypes";
import { Container } from "../types/ReceipeTypes";
// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4001",
  }),
  tagTypes: ["registeredContainer", "job"],
  endpoints: (builder) => ({
    createReceipe: builder.mutation({
      query: ({ receipe, m_id }) => ({
        url: `machine/${m_id}/receipe/create`,
        method: "POST",
        body: receipe,
      }),
    }),
    getReceipeList: builder.query({
      query: ({ m_id }) => `machine/${m_id}/receipe/list`,
    }),
    getReceipeDetails: builder.query({
      query: ({ m_id, r_id }) => `machine/${m_id}/receipe/${r_id}`,
    }),
    updateReceipe: builder.mutation({
      query: ({ m_id, r_id, receipeData }) => ({
        url: `machine/${m_id}/receipe/${r_id}/update`,
        method: "PATCH",
        body: receipeData,
      }),
    }),
    configureReceipe: builder.mutation({
      query: ({ m_id, r_id, receipeData }) => ({
        url: `machine/${m_id}/receipe/${r_id}/configure`,
        method: "PATCH",
        body: receipeData,
      }),
    }),
    createMachine: builder.mutation({
      query: (machineData: MachineCreateData) => ({
        url: `machine/create`,
        method: "POST",
        body: machineData,
      }),
    }),
    getMachineById: builder.query({
      query: (m_id) => `machine/${m_id}`,
    }),
    getRegisteredContainers: builder.query({
      query: (m_id) => `machine/${m_id}/registeredContainers/get`,
      providesTags: ["registeredContainer"],
    }),
    registerContainers: builder.mutation<
      Container[],
      { body: Container[]; m_id: string }
    >({
      query: ({ body, m_id }) => ({
        url: `machine/${m_id}/registeredContainers/register`,
        method: "POST",
        body,
      }),
    }),
    registerSingleContainer: builder.mutation<
      Container,
      { body: Container; m_id: string }
    >({
      query: ({ body, m_id }) => ({
        url: `machine/${m_id}/registeredContainers/registerOne`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => ["registeredContainer"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useConfigureReceipeMutation,
  useGetReceipeListQuery,
  useUpdateReceipeMutation,
  useGetReceipeDetailsQuery,
  useCreateReceipeMutation,
  useRegisterSingleContainerMutation,
  useCreateMachineMutation,
  useGetMachineByIdQuery,
  useRegisterContainersMutation,
  useGetRegisteredContainersQuery,
} = api;
