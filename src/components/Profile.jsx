import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function Profile() {
  const id = localStorage.getItem("id");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState("");

  let navigate = useNavigate();

  function redirectPath() {
    navigate("/");
  }

  useEffect(() => {
    axios
      .get(`https://682199fa259dad2655afc100.mockapi.io/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setProfileImg(res.data.profileImg);
        console.log(res.data);
      });
  }, []);

  //   {
  //     "username": "user109",
  //     "password": "user109@user109.user109",
  //     "email": "user109@user109.user109",
  //     "posts": [],
  //     "id": "11",
  //     "profileImg": "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
  // }

  const updateData = () => {
    localStorage.setItem("profileImg", profileImg);
    localStorage.setItem("username", username)

    axios({
      method: "put",
      url: `https://682199fa259dad2655afc100.mockapi.io/users/${id}`,
      data: {
        username: username,
        password: user.password,
        email: email,
        posts: user.posts,
        id: user.id,
        profileImg: profileImg,
      },
    }).then(() => {
      Swal.fire({
        title: "updated successfully",
        icon: "success",
      })
      redirectPath()
    })
    
  }

  return (
    <div className="flex flex-col lg:flex-row justify-around p-5">
      <div className="bg-blue-100 lg:w-4/10 rounded-2xl p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-">
          <h1>username</h1>
          <input
            className="bg-gray-50  border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1>email</h1>
          <input
            className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1>profile pic</h1>
          <input
            className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
            type="text"
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
          />
        </div>
        <button
          onClick={updateData}
          className="rounded text-white bg-blue-500 hover:bg-blue-900 p-3 text-center"
        >
          confirm
        </button>
      </div>
      {profileImg && (
        <img
          className="h-90 w-90 rounded-2xl self-center mt-5 lg:mt-0"
          src={profileImg}
          alt=""
        />
      )}
    </div>
  );
}

export default Profile;
