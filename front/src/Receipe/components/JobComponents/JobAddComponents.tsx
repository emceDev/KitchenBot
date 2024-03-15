import { Job, Container, Stove } from "../../../types/ReceipeTypes";
import { useState } from "react";
import { ContainerItem } from "../containerComponents/ContainerComponents";
import { StoveList } from "../stoveComponents/StoveList";

export const JobAddCreate: React.FC<{
  handleCreateJob: any;
  stoves: Stove[];
  containers: Container[];
  grayedContainers: Container[];
}> = ({ handleCreateJob, stoves, containers, grayedContainers }) => {
  //   const [containers, setContainers] = useState<Container[]>();
  const [showContainers, setShowContainers] = useState(true);
  const [container, setContainer] = useState<Container>();
  const [stove, setStove] = useState<Stove>();
  const [showStoves, setShowStoves] = useState(false);
  const handleSetContainer = (container: Container) => {
    // console.log('adding soruce')
    // console.log(container);
    setContainer(container);
    setShowContainers(false);
    setShowStoves(true);
  };
  const handleSetStove = async (stove: Stove) => {
    setStove(stove);
    handleCreateJob({ jobType: "add", stove: stove, container: container });
    setShowContainers(true);
    setShowStoves(false);
  };
  return (
    <div>
      {showContainers &&
        containers &&
        containers.map((container, index) => (
          <ContainerItem
            key={container.number + index}
            container={container}
            handleClick={handleSetContainer}
            grayed={grayedContainers.includes(container)}
          />
        ))}
      {/* listing stoves */}
      {showStoves && stoves && (
        <StoveList stoves={stoves} handleSetStove={handleSetStove} />
      )}
    </div>
  );
};
export const JobAddDetails: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div>
      {/* <div>Power of stove: {job.stove!.options.power}</div> */}
      <div>
        Adding: {job.container!.number}.{job.container!.contents.name}
      </div>
      <div>
        To stove: {job.stove!.number}.{job.stove!.name}
      </div>
    </div>
  );
};
export const JobAddEditDetails: React.FC<{
  handleJobAdd: any;
  stoves: Stove[];
  containers: Container[];
  grayedContainers: Container[];
}> = ({ handleJobAdd, stoves, containers, grayedContainers }) => {
  //   const [containers, setContainers] = useState<Container[]>();
  const [showContainers, setShowContainers] = useState(true);
  const [container, setContainer] = useState<Container>();
  // const [stove, setStove] = useState<Stove>();
  const [showStoves, setShowStoves] = useState(false);
  const handleSetContainer = (container: Container) => {
    // console.log('adding soruce')
    // console.log(container);
    setContainer(container);
    setShowContainers(false);
    setShowStoves(true);
  };
  const handleSetStove = async (stove: Stove) => {
    // setStove(stove);
    handleJobAdd({ jobType: "add", stove: stove, container: container! });
    setShowContainers(true);
    setShowStoves(false);
  };
  return (
    <div>
      {showContainers &&
        containers &&
        containers.map((container, index) => (
          <ContainerItem
            key={container.number + index}
            container={container}
            handleClick={handleSetContainer}
            grayed={grayedContainers.includes(container)}
          />
        ))}
      {/* listing stoves */}
      {showStoves && stoves && (
        <StoveList stoves={stoves} handleSetStove={handleSetStove} />
      )}
    </div>
  );
};
