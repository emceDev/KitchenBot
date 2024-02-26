import React, { useState } from "react";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [editingTodoTime, setEditingTodoTime] = useState("");
  const [editingTodoSessions, setEditingTodoSessions] = useState("");

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          time: "",
          sessions: [],
        },
      ]);
      setNewTodo("");
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditingTodoText(todo.text);
    setEditingTodoTime(todo.time);
    setEditingTodoSessions(todo.sessions);
  };

  const handleEditChange = (e) => {
    setEditingTodoText(e.target.value);
  };

  const handleTimeChange = (e) => {
    setEditingTodoTime(e.target.value);
  };

  const handleSessionsChange = (e) => {
    setEditingTodoSessions(e.target.value);
  };

  const handleSaveEdit = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingTodoId
          ? {
              ...todo,
              text: editingTodoText,
              time: editingTodoTime,
              sessions: editingTodoSessions,
            }
          : todo
      )
    );
    setEditingTodoId(null);
    setEditingTodoText("");
    setEditingTodoTime("");
    setEditingTodoSessions("");
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
    setEditingTodoTime("");
    setEditingTodoSessions("");
  };
  const handleStartSession = () => {
    console.log("test");
  };
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter todo..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  placeholder="Expected time"
                  value={editingTodoTime}
                  onChange={handleTimeChange}
                />
                <input
                  type="text"
                  placeholder="Sessions"
                  value={editingTodoSessions}
                  onChange={handleSessionsChange}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
                <button onClick={handleStartSession}>Start</button>
              </>
            ) : (
              <>
                <div>{todo.text}</div>
                <div>Expected time: {todo.time}</div>
                <div>Sessions: {todo.sessions}</div>
                <button onClick={() => handleEditClick(todo)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
