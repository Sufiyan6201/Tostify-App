import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";
function Tostify() {
  let [user, setUser] = useState({});
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/user/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  let handleInput = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      fetch(`http://localhost:3000/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Update successfully ", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(user);
      fetch(" http://localhost:3000/user ", {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Add successfully ", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        })
        .catch((error) => console.log(error));
    }
    setUser({});
    navigate("/view");
  };

  return (
    <>
      <h1 className="text-white">Hello World</h1>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form method="post" className="hii" onSubmit={handleSubmit}>
        <h3 className="text-white">Login Hear</h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name || ""}
          placeholder="Enter your name"
          onChange={handleInput}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={user.email || ""}
          placeholder="Enter Email"
          onChange={handleInput}
        />
        <label>Password</label>
        <input
          type="password"
          value={user.password || ""}
          name="password"
          placeholder="Enter Strong Password"
          onChange={handleInput}
        />
        <input type="submit" className="btn btn-success mt-4" value="Submit" />
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </>
  );
}

export default Tostify;
