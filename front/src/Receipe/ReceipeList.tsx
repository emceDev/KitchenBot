import { Link, useParams } from "react-router-dom";
import { useGetReceipeListQuery } from "../state/apiSlice";
import { Receipe } from "../types/ReceipeTypes";

export const ReceipeList = () => {
  const { m_id } = useParams();
  const receipesRes = useGetReceipeListQuery({ m_id });
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
            {receipe.status === "configured" ? (
              <button>Start</button>
            ) : (
              <Link to={`receipe/${receipe._id}/configure`}>
                <button>Configure</button>
              </Link>
            )}
            <button>Pause</button>
            <Link to={`receipe/${receipe._id}`}>
              <button>Details</button>
            </Link>
          </div>
        ))}
        <Link to="receipe/create">
          <button>Add Receipe</button>
        </Link>
      </div>
    );
  }
};
