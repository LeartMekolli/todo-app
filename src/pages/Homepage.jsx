import React, { useEffect, useState } from "react";
import { dataTodos } from "../data/data";
import { addTodo, emptyTodo, setTodos } from "../redux/actions/todo";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

const Homepage = ({
  todos,
  todo,
  setTodosToState,
  createTodo,
  emptyStateTodo,
}) => {
  const [isOpen, setIsOpen] = useState({ id: "", isOpen: false });
  const [createTodoModal, setCreateTodoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    setTodosToState(dataTodos);
  }, [dataTodos]);

  const handleToDoClick = (id) => {
    setIsOpen({ id: "", isOpen: false });
    const newTodos = todos?.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        };
      } else {
        return todo;
      }
    });
    const clickedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
    const clickedTodo = newTodos.splice(clickedTodoIndex, 1)[0];
    newTodos.push(clickedTodo);
    setTodosToState(newTodos);
  };
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodosToState(newTodos);
  };

  const filteredTodos = searchTerm
    ? todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : todos;

  return (
    <div className="homepage-container d-flex  flex-column align-items-center">
      <Modal
        show={createTodoModal}
        onHide={() => setCreateTodoModal(false)}
        size={"md"}
        className={"modalMain"}
      >
        <div className="modal-header">
          <span>Create todo</span>
        </div>
        <div className="modal-body">
          <label>Title</label>
          <input
            name="title"
            value={todo.title || ""}
            onChange={(e) => {
              createTodo("title", e.target.value);
            }}
            type="text"
          />
          <label>Description</label>
          <textarea
            name="description"
            value={todo.description || ""}
            onChange={(e) => {
              createTodo("description", e.target.value);
            }}
          />
        </div>
        <div className="modal-footer">
          <button
            className={
              todo.title === "" || todo.title === null
                ? "save-button disabled"
                : "save-button"
            }
            onClick={() => {
              setTodosToState([todo, ...todos]);
              emptyStateTodo();
              setCreateTodoModal(false);
            }}
            disabled={todo.title === "" || todo.title === null}
            type="button"
          >
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </Modal>
      <div className="todo-actions w-50 d-flex justify-content-between">
        <div className="search-bar">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="searchButton">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button
          className="create-button"
          onClick={() => setCreateTodoModal(true)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="todo-list w-50 d-flex flex-column">
        <table>
          <tbody>
            {filteredTodos?.map((todo, index) => (
              <tr key={index}>
                <td>
                  <div className="todo d-flex  flex-column justify-content-between align-items-center ">
                    <div className="actions d-flex justify-content-between">
                      <div className="title-checkbox">
                        <input
                          type="checkbox"
                          id={`todo-${index}`}
                          name={`todo-${index}`}
                          value={`todo-${index}`}
                          onClick={(e) => e.stopPropagation()}
                          checked={todo.done}
                          onChange={() => handleToDoClick(todo.id)}
                        />
                        <label
                          onClick={() => {
                            if (isOpen.id === todo.id) {
                              setIsOpen({ id: "", isOpen: !isOpen.isOpen });
                            } else {
                              setIsOpen({ id: todo.id, isOpen: true });
                            }
                          }}
                          className={todo.done ? "checked" : ""}
                        >
                          {todo.title}
                        </label>
                      </div>
                      <div
                        className="remove"
                        onClick={() => removeTodo(todo.id)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </div>
                    </div>
                    <div
                      className={
                        isOpen.id === todo.id && isOpen.isOpen
                          ? "description open"
                          : "description"
                      }
                    >
                      {todo.description}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
  todo: state.todo,
});

const mapDispatchToProps = (dispatch) => ({
  setTodosToState: (data) => dispatch(setTodos(data)),
  createTodo: (key, value) => dispatch(addTodo(key, value)),
  emptyStateTodo: () => dispatch(emptyTodo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
