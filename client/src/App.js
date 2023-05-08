import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Todo from './components/todo/Todo';
import TodoList from './components/todo/TodoList';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/todolist" element={<TodoList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
