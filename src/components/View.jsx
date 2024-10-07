import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


function View() {
  let [userData, setData] = useState([]);
  useEffect(() => {
    fechData();
  }, []);
  let fechData = () => {
    fetch("http://localhost:3000/user", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch({
        error: console.error,
      });
  };
  let handleDel = (id) => {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json()).then(()=>{
          fechData();
    toast.error("Delete successfully ",{
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
    })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    <ToastContainer/>
        <h1 className="display-3 text-center">Record Data</h1>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th className="bg-dark text-white">Name</th>
            <th className="bg-dark text-white">Email</th>
            <th className="bg-dark text-white">Password</th>
            <th className="bg-dark text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((v, i) => (
            <tr key={i}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.password}</td>
              <td>
                <button className="btn btn-outline-danger me-3 " onClick={() => handleDel(v.id)}>Delete</button>
                <button className="btn btn-success "><Link className="text-white text-decoration-none" to={`/${v.id}`}>Edite</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default View;
