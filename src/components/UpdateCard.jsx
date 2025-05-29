import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function UpdateCard() {
  const [item, setItem] = useState("");
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  let navigate = useNavigate();

  function redirectPath() {
    navigate("/");
  }

  //   {
  //     "id": "5",
  //     "image": "https://images.pexels.com/photos/29635023/pexels-photo-29635023/free-photo-of-serene-foggy-forest-overlooking-a-tranquil-lake.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //     "name": "name1",
  //     "gender": "Male",
  //     "username": "user183"
  // }

  useEffect(() => {
    axios
      .get(`https://682199fa259dad2655afc100.mockapi.io/characters3/${id}`)
      .then((res) => {
        setItem(res.data);
        setName(res.data.name);
        setImage(res.data.image);
        console.log(res.data);
      });
  }, []);

  const updateData = () => {
    axios({
      method: "put",
      url: `https://682199fa259dad2655afc100.mockapi.io/characters3/${id}`,
      data: {
        id: item.id,
        image: image,
        name: name,
        gender: item.gender,
        username: item.username,
      },
    }).then(() => {
      Swal.fire({
        title: "updated successfully",
        icon: "success",
      });
      redirectPath();
    });
  };

  return (
    <div className="bg-blue-100 p-5 flex flex-col gap-4 items-center">
      <div className="flex justify-center items-center gap-3">
        <h1>name</h1>
        <input
          className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex justify-center items-center gap-3">
        <h1>Image</h1>
        <input
          className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button
        onClick={updateData}
        className="rounded text-white bg-blue-500 hover:bg-blue-900 p-3 text-center"
      >
        confirm
      </button>
    </div>
  );
}

export default UpdateCard;
