export const Job = ({ job }) => {
  return (
    <div>
      type : {job.type}
      Source: {job.source.name}
      destination :{job.destination.name}
    </div>
  );
};
