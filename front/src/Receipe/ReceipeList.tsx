import { useParams } from "react-router-dom";
import { useGetReceipeListQuery } from "../state/apiSlice";
import { Job, Receipe, Container } from "../types/ReceipeTypes";

import { useState } from "react";
export const ReceipeList = () => {
  const { m_id } = useParams();
  const receipesRes = useGetReceipeListQuery({ m_id });
  // const handleStart = (_id) => {
  //   //receipe status !configured => redirect to configure receipe
  // };
  if (receipesRes.isLoading) {
    return <div>Loading receipes...</div>;
  } else if (receipesRes.error) {
    return <div>An error occured</div>;
  } else if (receipesRes.data) {
    const receipes = receipesRes.data;
    return (
      <div>
        Receipes:
        {receipes.map((receipe: Receipe) => (
          <div key={receipe._id}>
            {receipe.name}. {receipe.status}
            <button>Start</button>
            <button>Pause</button>
            <button>Details</button>
          </div>
        ))}
      </div>
    );
  }
};
