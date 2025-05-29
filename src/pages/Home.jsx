import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";

function Home() {
  const [item, setItem] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  // const [gender, setGender] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchList, setSearchList] = useState([]);

  const username = localStorage.getItem("username");

  // post a new charachter
  const check_data = () => {
    // check login status
    if (!username) {
      Swal.fire({
        title: "You are not logged in",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (image == "" || name == "") {
      Swal.fire({
        title: "all values must be filled",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    axios({
      method: "post",
      url: "https://682199fa259dad2655afc100.mockapi.io/characters3",
      data: {
        image: image,
        name: name,
        // gender: gender,
        username: username,
      },
    }).then((res) => {
      setSearchList([...item, res.data]);
      setItem([...item, res.data]);
    });
  };

  // search all posts
  const Search = () => {
    if (searchName == "") {
      setSearchList(item);
      return;
    }

    let result = item.find((character) => {
      return character.name == searchName;
    });

    if (result) {
      setSearchList([result]);
    } else {
      Swal.fire({
        title: "oops!",
        text: "charachter not found",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // get data
  useEffect(() => {
    fetch(`https://682199fa259dad2655afc100.mockapi.io/characters3`)
      .then((response) => response.json())
      .then((data) => {
        setSearchList(data);
        console.log(data)
        setItem(data);
      });
  }, []);

  // delete charachter
  const deleteItem = (id) => {
    axios
      .delete(`https://682199fa259dad2655afc100.mockapi.io/characters3/${id}`)
      .then(() => {
        let filteredList = item.filter((del) => {
          return del.id != id;
        });
        setItem(filteredList);
        setSearchList(filteredList);
      });
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center">
      {username && (
        <div>
        <h1 className="text-xl my-3 font-bold">welcome {username}</h1>
        {/* <Link to={""}>go to profile</Link> */}
        </div>
      )}

      <div className="lg:flex justify-around items-center lg:w-full">
        <div className="flex flex-col gap-3 mt-3 lg:flex-row lg:items-center lg:justify-around w-full  justify-around">
          <div className="flex gap-2 p-3 bg-gray-300 rounded-2xl">
            <input
              type="text"
              className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
              placeholder="Search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button
              className="rounded text-white bg-blue-500 hover:bg-blue-900 px-1 text-center"
              onClick={Search}
            >
              Search
            </button>
          </div>
          <div className="flex flex-col gap-2 p-3 bg-gray-200 rounded-2xl">
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              Add new character
            </h1>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
              placeholder="image"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
              placeholder="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* <div className="flex justify-center gap-3 p-2 items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  value={"Male"}
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  value={"Female"}
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Female
                </label>
              </div>
            </div> */}

            <button
              className="rounded p-1 text-white bg-green-500 hover:bg-green-900 text-center"
              onClick={check_data}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="lg:w-9/10">
        <ul className="p-5 flex flex-wrap justify-center  gap-3">
          {searchList.map((element, index) => (
            <li className="rounded-2xl" key={index}>
              <div className=" flex flex-col justify-around w-[35vh] bg-white pt-2  hover:translate-1 transition delay-50 shadow-2xl">
                <div className="flex flex-col gap-5">
                  <p className="text-center font-bold">{element.name}</p>
                  {/* <p
                    className={
                      element.gender == "Female"
                        ? "text-center text-red-500"
                        : "text-center text-blue-500"
                    }
                  >
                    {element.gender}
                  </p> */}
                  <p className="text-center text-gray-500">
                    @{element.username}
                  </p>
                  <img className="" src={element.image} alt="" />
                    <div className="flex justify-around pb-3">
                                        <button
                    className={
                      element.username == username
                        ? "rounded text-white bg-red-500 hover:bg-red-900 px-1 text-center"
                        : "hidden"
                    }
                    onClick={() => deleteItem(element.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`UpdateCard/${element.id}`}
                    className={
                      element.username == username
                        ? "rounded text-white  bg-cyan-500 hover:bg-cyan-900 px-1 text-center"
                        : "hidden"
                    }
                  >
                    Update
                  </Link>
                    </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
