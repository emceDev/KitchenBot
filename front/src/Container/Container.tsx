import React, { useState } from 'react';

interface Container {
  contents: {
    type: string,
    name: string,
    weight: number
  },
  number: string
}

interface ContainerListItemProps {
  container: Container;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const ContainerListItem: React.FC<ContainerListItemProps> = ({ container, onEdit, onDelete }) => {
  return (
    <div>
      <p>Type: {container.contents.type}</p>
      <p>Name: {container.contents.name}</p>
      <p>Weight: {container.contents.weight}</p>
      <p>Number: {container.number}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

interface ContainerFormProps {
  container: Container;
  onSubmit: (container: Container) => void;
}

const ContainerForm: React.FC<ContainerFormProps> = ({ container, onSubmit }) => {
  const [newContainerContents, setNewContainerContents] = useState(container.contents);
  const [newContainerNumber, setNewContainerNumber] = useState(container.number);

  const handleFormSubmit = () => {
    onSubmit({
      contents: { ...newContainerContents },
      number: newContainerNumber
    });
    setNewContainerContents({
      type: '',
      name: '',
      weight: 0
    });
    setNewContainerNumber('');
  };

  return (
    <div>
      <label>Type:</label>
      <input type="text" value={newContainerContents.type} onChange={(e) => setNewContainerContents({ ...newContainerContents, type: e.target.value })} />
      <label>Name:</label>
      <input type="text" value={newContainerContents.name} onChange={(e) => setNewContainerContents({ ...newContainerContents, name: e.target.value })} />
      <label>Weight:</label>
      <input type="number" value={newContainerContents.weight} onChange={(e) => setNewContainerContents({ ...newContainerContents, weight: Number(e.target.value) })} />
      <label>Number:</label>
      <input type="text" value={newContainerNumber} onChange={(e) => setNewContainerNumber(e.target.value)} />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

const ContainerManager: React.FC = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const handleDeleteContainer = (index: number) => {
    const updatedContainers = [...containers];
    updatedContainers.splice(index, 1);
    setContainers(updatedContainers);
  };
  const saveContainers=()=>{
    console.log(containers)
  }
  return (
    <div>
      <h2>Containers</h2>
      {containers.map((container, index) => (
        <ContainerListItem
          key={index}
          container={container}
          onEdit={() => handleEditContainer(index)}
          onDelete={() => handleDeleteContainer(index)}
        />
      ))}
      {editingIndex !== null ? (
        <ContainerForm
          container={containers[editingIndex]}
          onSubmit={(editedContainer) => handleSaveEdit(editingIndex, editedContainer)}
        />
      ) : (
        <ContainerForm
          container={{ contents: { type: '', name: '', weight: 0 }, number: '' }}
          onSubmit={handleAddContainer}
        />
      )}
      <button onClick={saveContainers}>Save container changes</button>
    </div>
  );
};

export default ContainerManager;
