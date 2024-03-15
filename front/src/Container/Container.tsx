import React, { useState, useEffect } from "react";
import {
  ContainerFormProps,
  ContainerListItemProps,
  Container,
} from "../types/ReceipeTypes";
import {
  useGetRegisteredContainersQuery,
  useRegisterContainersMutation,
  useRegisterSingleContainerMutation,
} from "../state/apiSlice";
import { useParams } from "react-router-dom";

const ContainerListItem: React.FC<ContainerListItemProps> = ({
  container,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <p>Type: {container.contents.contentsType}</p>
      <p>Name: {container.contents.name}</p>
      <p>Weight: {parseInt(container.contents.weight)}</p>
      <p>Number: {container.number}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export const ContainerForm: React.FC<ContainerFormProps> = ({
  container,
  onSubmit,
}) => {
  const [newContainerContents, setNewContainerContents] = useState(
    container.contents
  );
  const [newContainerNumber, setNewContainerNumber] = useState(
    container.number
  );

  const handleFormSubmit = () => {
    onSubmit({
      type: "container",
      contents: { ...newContainerContents },
      number: newContainerNumber,
    });
    setNewContainerContents({
      contentsType: "",
      name: "",
      weight: 0,
    });
    setNewContainerNumber("");
  };

  return (
    <div>
      <label>Contents:</label>
      <input
        type="text"
        value={newContainerContents.name}
        onChange={(e) =>
          setNewContainerContents({
            ...newContainerContents,
            name: e.target.value,
          })
        }
      />
      <label>
        Weight:{" "}
        <input
          type="number"
          value={
            newContainerContents.weight &&
            newContainerContents.weight.toString()
          }
          onChange={(e) =>
            setNewContainerContents({
              ...newContainerContents,
              weight: Number(e.target.value),
            })
          }
        />
      </label>

      <label>
        Container Number:{" "}
        <input
          type="text"
          value={newContainerNumber}
          onChange={(e) => setNewContainerNumber(e.target.value)}
        />
      </label>
      <label>
        Contents type:{" "}
        <input
          type="text"
          value={newContainerContents.contentsType}
          onChange={(e) =>
            setNewContainerContents({
              ...newContainerContents,
              contentsType: e.target.value,
            })
          }
        />
      </label>
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

const ContainerManager: React.FC = () => {
  const m_id = useParams().m_id;
  const { data, error, isLoading } = useGetRegisteredContainersQuery(m_id);
  const [containers, setContainers] = useState<Container[]>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [registerContainers, res] = useRegisterContainersMutation();
  const [registerSingleContainer, registerSingleContainerRes] =
    useRegisterSingleContainerMutation();
  const handleAddContainer = (container: Container) => {
    setContainers([...containers, container]);
  };
  const handleEditContainer = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = (index: number, editedContainer: Container) => {
    const updatedContainers = [...containers];
    updatedContainers[index] = editedContainer;
    setContainers(updatedContainers);
    setEditingIndex(null);
  };
  const handleRegisterSingleContainer = (container: Container) => {
    m_id &&
      container &&
      registerSingleContainer({ body: container, m_id: m_id });
  };
  const handleDeleteContainer = (index: number) => {
    const updatedContainers = [...containers];
    updatedContainers.splice(index, 1);
    setContainers(updatedContainers);
  };
  const saveContainers = () => {
    m_id && registerContainers({ body: containers, m_id });
  };

  useEffect(() => {
    if (data) {
      // Update containers state with fetched data when it's available
      setContainers(data.registeredContainers);
      console.log("new container");
    }
  }, [data]);
  return (
    <div>
      <h2>Containers</h2>
      {containers &&
        containers.map((container, index) => (
          <ContainerListItem
            key={index}
            container={container}
            onEdit={() => handleEditContainer(index)}
            onDelete={() => handleDeleteContainer(index)}
          />
        ))}
      Add container:
      {/* {!isLoading && editingIndex !== null ? (
        <ContainerForm
          container={containers[editingIndex]}
          onSubmit={(editedContainer) =>
            handleSaveEdit(editingIndex, editedContainer)
          }
        />
      ) : (
        <ContainerForm
          container={{
            number: "",
            type: "container",
            contents: {
              type: "container",
              name: "",
              weight: 0,
            },
          }}
          onSubmit={handleAddContainer}
        />
      )} */}
      <ContainerForm
        container={{
          number: "",
          type: "container",
          contents: {
            contentsType: "container",
            name: "",
            weight: 0,
          },
        }}
        onSubmit={handleRegisterSingleContainer}
      />
      <button onClick={saveContainers}>Save container changes</button>
    </div>
  );
};

export default ContainerManager;
