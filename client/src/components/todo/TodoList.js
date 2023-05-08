import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodoList(props) {
  const history = useNavigate();
  // console.log(props);
  const id = props.data._id;
  // er task e map use kore amra prottek list print korbo
  const { task } = props.data;
  //  backedn e pathano hobe ei state k
  const [deleteitem, setDeleteitem] = useState({
    id: '64512d24d32f829762b47e38',
    objectid: '6451f51f04671ecccbe8c6ee',
  });

  const handleDelete = async () => {
    // e.preventDefault();
    // console.log(e);
    // setDeleteitem({
    //   // ...deleteitem,
    //   id: '64512d24d32f829762b47e38',
    //   objectid: '6451f51f04671ecccbe8c6ee',
    // });

    try {
      console.log(deleteitem);
      await axios
        .delete('http://localhost:5000/api/deletetodo', deleteitem)
        .then((res) => {
          alert('Delete Successfuly');
          console.log(res);
          // history('/', { state: { data: res.data } });
        });
    } catch (error) {
      alert(error.message);
    }
  };

  // console.log(task);

  //   console.log(props.data.task);
  return (
    <div>
      <ol>
        {task.map((item) => (
          <div className="container text-center">
            <div className="row my-4 bg-light-subtle">
              <div className="col-10">
                <li key={task._id}>{item.item}</li>
              </div>
              <div className="col-2">
                <button
                  className="mx-5 btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() => handleDelete()}
                  // onClick={async () => {
                  //   // console.log(e);
                  //   setDeleteitem({
                  //     // ...deleteitem,
                  //     id: '64512d24d32f829762b47e38',
                  //     objectid: '6451f51f04671ecccbe8c6ee',
                  //   });

                  //   try {
                  //     console.log(deleteitem);
                  //     await axios
                  //       .delete(
                  //         'http://localhost:5000/api/deletetodo',
                  //         deleteitem
                  //       )
                  //       .then((res) => {
                  //         alert('Delete Successfuly');
                  //         console.log(res);
                  //         // history('/', { state: { data: res.data } });
                  //       });
                  //   } catch (error) {
                  //     alert(error.message);
                  //   }
                  // }}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
}
