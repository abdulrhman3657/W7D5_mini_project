import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

function Login() {
  let navigate = useNavigate()

  function redirectPath() {
    navigate("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const checkInput = () => {
    axios
      .get(`https://682199fa259dad2655afc100.mockapi.io/users?email=${email}`)
      .then((res) => {

        if(res.data[0].password != password || res.data[0].email != email){
          throw new Error("error")
        }

        // console.log(res.data[0])

        localStorage.setItem("username", res.data[0].username)
        localStorage.setItem("id", res.data[0].id)

        Swal.fire({
          title: "logged in successfully",
          icon: "success",
        })

        redirectPath()

      })
      .catch((err) => {

        Swal.fire({
          icon: "error",
          title: "invalid email or password",

        })

        console.log(err)

      })
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8 bg-linear-65 from-blue-200 to-cyan-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                {/* email input */}
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                {/* password input */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={checkInput}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Log in
              </button>
            </div>
          </div>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not signed up?
            <Link
              to="../signup"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              {" "}
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
