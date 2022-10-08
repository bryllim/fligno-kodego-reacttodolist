import React, {useEffect} from 'react';
import './App.css';
import { Button, Card } from 'react-bootstrap';
import FormTodo from './FormTodo';
import Todo from './Todo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const laravelURL = "http://127.0.0.1:8001/api/fetchtodos";
  useEffect(() => {
    fetch(laravelURL)
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => console.log(error));
  }, []);
  
  const [todos, setTodos] = React.useState([
    {
      id: "",
      text: "This is an example todo.",
      isDone: false,
      created_at: "",
      updated_at: "",
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card className="mb-2">
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
