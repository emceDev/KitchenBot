import { useParams } from "react-router-dom";
import {
  useConfigureReceipeMutation,
  useGetReceipeDetailsQuery,
  useGetRegisteredContainersQuery,
} from "../state/apiSlice";
import { useState, useEffect } from "react";
import { ContainerItem } from "./components/containerComponents/ContainerComponents";
import { Container, Job, Receipe } from "../types/ReceipeTypes";

export const ReceipeConfigure = () => {
  const { r_id, m_id } = useParams();
  const [jobs, setJobs] = useState<Job[]>();
  const [indexes, setIndexes] = useState<number[]>();
  const [registeredContainers, setRegisteredContainers] = useState([]);
  const [index, setIndex] = useState(0);
  const [grayedContainers, setGrayedContainers] = useState<Container[]>([]);
  const [receipe, setReceipe] = useState<Receipe>();
  const receipeRes = useGetReceipeDetailsQuery({ m_id, r_id });
  const containersRes = useGetRegisteredContainersQuery(m_id);
  const [updateConf, updateConfRes] = useConfigureReceipeMutation();
  useEffect(() => {
    if (containersRes.data && containersRes.data.registeredContainers) {
      setRegisteredContainers(
        JSON.parse(JSON.stringify(containersRes.data.registeredContainers))
      );
      //   console.log(registeredContainers);
    }
  }, [containersRes.data]);

  useEffect(() => {
    if (receipeRes.data && receipeRes.data.jobs) {
      const jobs = JSON.parse(JSON.stringify(receipeRes.data.jobs));
      setJobs(jobs);
      let indexArr: number[] = [];
      jobs.map(
        (job: Job, index: number) =>
          job.jobType === "add" && indexArr.push(index)
      );
      setIndexes(indexArr);
      const receipe = JSON.parse(JSON.stringify(receipeRes.data));
      console.log("setting contaienrs to 0");
      receipe.containers = [];
      setReceipe(receipe);
    }
  }, [receipeRes.data]);

  const handleChooseContainer = (container: Container) => {
    console.log(
      "choosen container",
      container.contents.name,
      "for ",
      index,
      "of",
      indexes?.length
    );
    const updatedJobs: Job[] = jobs;
    updatedJobs[indexes[index]]!.container = container;
    setJobs(updatedJobs);
    setGrayedContainers([...grayedContainers, container]);
    const newContainers = [...receipe.containers, container];
    console.log("new containers: ", newContainers);
    const newReceipe: Receipe = {
      ...receipe,
      containers: newContainers,
      jobs: updatedJobs,
    };
    setReceipe(newReceipe);
    index + 1 < indexes?.length! && setIndex(index + 1);
    index + 1 === indexes?.length && saveConfiguration(newReceipe);
  };
  const saveConfiguration = (newReceipe: Receipe) => {
    console.log("saving");
    updateConf({ r_id, m_id, receipeData: newReceipe });
    // console.log(newReceipe);
  };
  useEffect(() => {
    // receipe && console.log("new receipe", receipe.jobs[indexes[index]]);
  }, [receipe]);

  //   post to api configure receipe: new containers, jobs
  return (
    <div>
      Required for receipe:
      {index + 1} of {indexes?.length}
      <p>{jobs && jobs[indexes[index]].container!.contents.name}</p>
      Can be found in:
      {registeredContainers &&
        registeredContainers.map((container: Container) => (
          <ContainerItem
            key={container.number + index}
            container={container}
            handleClick={handleChooseContainer}
            grayed={grayedContainers.includes(container)}
          />
        ))}
    </div>
  );
};

// const RegisteredContainerList = () => {
//   const [registeredContainers, setRegisteredContainers] = useState([]);
//   const { m_id } = useParams();
//   const containersRes = useGetRegisteredContainersQuery(m_id);
//   useEffect(() => {
//     if (containersRes.data && containersRes.data.registeredContainers) {
//       setRegisteredContainers(containersRes.data.registeredContainers);
//       console.log(registeredContainers);
//     }
//   }, [containersRes.data]);

//   if (containersRes.isLoading) {
//     return <div>loading containers</div>;
//   } else if (containersRes.error) {
//     return <div>Oops there was an error loading registered containers</div>;
//   } else if (registeredContainers) {
//     return (
//       <div>
//         x
//         {registeredContainers.map((container) => (
//           <div key={container.number}>container</div>
//         ))}
//       </div>
//     );
//   }
// };
