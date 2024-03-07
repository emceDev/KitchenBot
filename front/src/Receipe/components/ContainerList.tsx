import { Container, SetSourceFunction } from "../../types/ReceipeTypes";

// compoennt renders ContainersList
// grayed containers are already used containers
// container onclick invokes handleSetSource(container)

export const ContainersList: React.FC<{
  containers: Container[];
  handleSetSource: SetSourceFunction;
  grayedContainers: Container[];
}> = ({ containers, handleSetSource, grayedContainers }) => {
  return containers.map((container) => (
    <div
      key={container.number}
      onClick={() =>
        !grayedContainers.includes(container)
          ? handleSetSource(container)
          : alert("already added")
      }
    >
      {container.contents.name}
    </div>
  ));
};
