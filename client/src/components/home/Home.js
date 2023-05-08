import React from 'react';
import { useLocation } from 'react-router-dom';
import Todo from '../todo/Todo';
import TodoList from '../todo/TodoList';

export default function Home(props) {
  const location = useLocation();
  const { data } = location.state;
  const { name } = data;
  // const id = _id;
  // const { item } = task;

  console.log(data);
  // console.log(id);
  return (
    <div>
      <h1>Hi {name}</h1>
      <br />

      <h4>Welcome to your ToDo dashboard</h4>
      {/* <Todo id={id} /> */}
      <Todo data={data} />
      <TodoList data={data} />
    </div>
  );
}
