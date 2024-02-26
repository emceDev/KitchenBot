import { Link, Outlet, useParams } from "react-router-dom";
import { styles } from "../../Task.module.scss";
import { useGetTaskListQuery } from "../../../../State/services";
import { useState } from "react";

export const TaskList = () => {
  let { m_id } = useParams();
  const { data, error, isLoading } = useGetTaskListQuery(m_id);
  const [createTask, setCreateTask] = useState(false);
  return (
    <div>
      TASKS:
      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <div className={styles.TaskList}>
            {data.tasks.map((task) => {
              return <Link to={`Task/${task._id}`}>{task.name}</Link>;
            })}
          </div>
        ) : null}
      </div>
      {/* {createTask && <CreateTask m_id={m_id} />}
        <button onClick={() => setCreateTask(!createTask)}>Add New Task?</button> */}
      <Outlet />
    </div>
  );
};
