export const EditTask = () => {
  let { m_id, t_id } = useParams();
  const { data, error, isLoading } = useGetTaskQuery({ m_id, t_id });
  const task = data;
  const [jobs, setJobs] = useState(task.jobs);
  const [name, setName] = useState(task.name);
  const [addJobShown, setAddJobShown] = useState(false);
  const [editTask] = useEditTaskMutation();
  const updateStateById = (oldData, incomingData) => {
    // Iterate over the oldData array
    const updatedData = oldData.map((item) => {
      // Check if the item's _id matches the incomingData id
      if (item._id === incomingData.id) {
        // If matched, update the item with incomingData
        return {
          ...item, // Keep existing properties
          type: incomingData.type,
          destination: incomingData.destination,
          source: incomingData.source,
          // Add other properties to update here
        };
      } else {
        // If not matched, return the original item
        return item;
      }
    });

    // Return the updated data
    return updatedData;
  };
  const addJob = (job) => {
    setJobs([...jobs, job]);
    console.log({ m_id, t_id });
  };
  const editJob = (newData) => {
    console.log("OLD DATA:");
    console.log(task.jobs);
    console.log("INCOMING DATA:");
    console.log(newData);
    setJobs(updateStateById(task.jobs, newData));
    console.log("NEW STATE:");
    console.log(jobs);
  };
  const saveTask = () => {
    console.log("saving");
    console.log(jobs);
    // editTask({ m_id, t_id, data: { jobs } });
  };
  {
    return (
      data && (
        <>
          {console.log(data)}
          <JobList
            jobs={task.jobs}
            editJob={(j_id) => {
              editJob(j_id);
            }}
          />

          <button onClick={saveTask}>Save</button>
        </>
      )
    );
  }
};
