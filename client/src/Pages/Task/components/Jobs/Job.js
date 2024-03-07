export const Job = ({ job }) => {
  return (
    <div>
      {console.log(job)}
      type: {job.type}
      Source: {job.source.name}
      Contents: {job.source.contents.name}
      destination :{job.destination.name}
    </div>
  );
};
