import { Job } from "./Job";
import styles from "./Jobs.module.scss";
import { EditJob } from "./EditJob";
export const JobList = ({ jobs, editJob }) => {
  // const [edit, setEdit] = useState(false);
  return (
    <div className={styles.JobList}>
      {jobs.map((job, index) => (
        <>
          <Job job={job} key={job._id} />
          {editJob && (
            <>
              <EditJob editJob={(x) => editJob(x)} job={job} />
            </>
          )}
          <br></br>
        </>
      ))}
    </div>
  );
};
