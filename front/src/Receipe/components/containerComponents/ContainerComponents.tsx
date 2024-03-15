import { Container, SetSourceFunction } from "../../../types/ReceipeTypes";

// compoennt renders ContainersList
// grayed containers are already used containers
// container onclick invokes handleSetSource(container)

export const ContainersList: React.FC<{
  containers: Container[];
  grayedContainers?: Container[];
}> = ({ containers, grayedContainers }) => {
  return (
    <div>
      Registered Containers:
      {containers &&
        containers.map((container) => (
          <div key={container.number}>{container.contents.name}</div>
        ))}
    </div>
  );
};
export const ContainersListEdit: React.FC<{
  containers: Container[];
  handleSetContainer: SetSourceFunction;
  grayedContainers: Container[];
}> = ({ containers, handleSetContainer, grayedContainers }) => {
  return containers.map((container) => (
    <ContainerEdit
      key={container.number}
      container={container}
      handleSetContainer={
        !grayedContainers.includes(container)
          ? () => handleSetContainer(container)
          : () => alert("already added")
      }
    />
  ));
};
export const ContainerEdit: React.FC<{
  container: Container;
  handleSetContainer: any;
}> = ({ handleSetContainer, container }) => {
  return (
    <div key={container.number} onClick={handleSetContainer}>
      {container.contents.name}
    </div>
  );
};
export const ContainerView: React.FC<{
  container: Container;
  handleSetContainer?: any;
  grayed?: boolean;
}> = ({ container, handleSetContainer, grayed }) => {
  return (
    <div
      key={container.number}
      onClick={() =>
        grayed ? alert("already set") : handleSetContainer(container)
      }
    >
      {container.contents.name}
    </div>
  );
};

export const ContainerItem: React.FC<{
  container: Container;
  handleClick: any;
  grayed: boolean;
}> = ({ handleClick, container, grayed }) => {
  return (
    <div
      key={container.number}
      onClick={() => (grayed ? alert("already added") : handleClick(container))}
      style={{ border: "1px solid", borderColor: grayed ? "gray" : "green" }}
    >
      {container.number}.{container.contents.name}
    </div>
  );
};
