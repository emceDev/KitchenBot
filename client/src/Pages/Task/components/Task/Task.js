import { useState } from "react";
import { useGetTaskQuery } from "../../../../State/services";
import { JobList } from "../Jobs/JobList";
import { Link, Outlet, useParams } from "react-router-dom";

export const Task = () => {
  let { m_id, t_id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { data, error, isLoading } = useGetTaskQuery({ m_id, t_id });
  const task = data;
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <label>
            Name
            <p>{task.name}</p>
          </label>
          {/* {!isEditing && <Table objArr={task.jobs} exclude={["_id"]} />} */}
          <JobList jobs={task.jobs} m_id={m_id} t_id={t_id} />
          <Link
            to="edit"
            state={{ m_id, t_id, task }}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Modify Task
          </Link>
          <Outlet />
        </>
      ) : null}
    </div>
  );
};
