import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Todo(props) {
  const data = props.data;
  const history = useNavigate();
  // ekhane add ta backend e pathano hobe
  // props theke login kora id niye sei Id tei new task add kora hobe
  // console.log(props);

  console.log(data);
  const [add, setAdd] = useState({
    item: '',
    id: '',
  });
  // setAdd({
  //   id: id,
  // });

  const handleChange = (e) => {
    // const id = data._id;
    const { _id } = data;
    console.log(_id);
    const { name, value } = e.target;
    setAdd({
      ...add,
      [name]: value,
      id: _id,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { item } = add;
    // ekhane Home theke props er maddhome id pathano hoyeche
    console.log(add);

    if (item) {
      await axios.put('http://localhost:5000/create', add).then((res) => {
        alert('Successfully added');
        console.log(res);
        history('/', { state: { data: res.data } });
      });
    } else {
      alert('Please add todos');
    }
  };

  return (
    <div className="todo">
      {/* {console.log(add)} */}

      <h1>Todo</h1>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Todos :
          <input
            type="text"
            name="item"
            value={add.add}
            onChange={handleChange}
            placeholder="Add your todos"
          />
        </label>
        <input type="submit" value="Add" />
      </form> */}
      <div className="input-group mb-3">
        <input
          type="text"
          name="item"
          className="form-control"
          placeholder="Add your todos"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={add.add}
          onChange={handleChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={handleSubmit}
        >
          Add Todos
        </button>
      </div>
    </div>
  );
}
