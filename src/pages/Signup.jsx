import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router";
import axios from "axios";



function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [users, setUsers] = useState("")

  useEffect(() => {
    axios.get("https://682199fa259dad2655afc100.mockapi.io/users")
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  let navigate = useNavigate();

  function redirectPath(){
      navigate("/login")
  }

  const checkInput = () => {

    // check username
    if(username.length >= 3 && username.length <= 50){
      // set localhost
      console.log(username)
    } else {
      Swal.fire({
        icon: "error",
        title: "username must be between 3 and 50",
      });
      return
    }

  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // check email
  if(emailIsValid(email)){
    console.log(email)
  } else {
      Swal.fire({
        icon: "error",
        title: "email is not valid",
      });
      return    
  }

  // check password
  if(password.length < 8){
      Swal.fire({
        icon: "error",
        title: "password must be at least 8 charachters",
      });
      return   
  } else if (password !== passwordConfirm) {
        Swal.fire({
        icon: "error",
        title: "passwords does not match",
      });
      return   
  } else{
    // set local host
  }


  // check if user exists
  const checkUser = users.find((user) => {
    return user.username == username || user.email == email
  })

  if(checkUser){
    Swal.fire({
        icon: "error",
        title: "user already exits",
      });
    return
  }


  localStorage.setItem("profileImg", "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg");

  axios({
      method: "post",
      url: "https://682199fa259dad2655afc100.mockapi.io/users",
      data: { 
        username: username,
        email: email,
        password: password,
        profileImg: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
      },
    }).then((res) => {
      console.log(res.data)
    })

  Swal.fire({
    title: "signed up successfully",
    icon: "success"
  })

  setUsername("")
  setEmail("")
  setPassword("")
  setPasswordConfirm("")



  redirectPath()

  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8 bg-linear-65 from-blue-200 to-cyan-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign up</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">Username</label>
              <div className="mt-2">
                {/* username input */}
                <input value={username}  onChange={(e) => setUsername(e.target.value)} type="text" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
              </div>
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">Email</label>
              <div className="mt-2">
                {/* email input */}
                <input value={email}  onChange={(e) => setEmail(e.target.value)} type="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                {/* password input */}
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
              </div>
              <div className="mt-2">
                {/* confirm password input */}
                <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <button onClick={checkInput} className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign up</button>
            </div>
          </div>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already signed up?
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500"> login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;