import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

async function signUpService(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const signUpObj = {
      name: firstName + " " + lastName,
      password: password,
      email: email,
    };
    const response = await axios.post(
      "https://backend.ishubham-sonthalia.workers.dev/api/v1/user/signup",
      signUpObj
    );
    if (response) {
      console.log(response);
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function signInService(email: string, password: string) {
  const signInObj = {
    email: email,
    password: password,
  };
  try {
    const response = await axios.post(
      "https://backend.ishubham-sonthalia.workers.dev/api/v1/user/signin",
      signInObj
    );
    if (response) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          email: email,
          token: response.data.jwtToken,
        })
      );
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const Card = ({
  signIn,
  message,
}: {
  signIn: boolean;
  message: string;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSignUpAndSignIn();
    }
  };
  const handleSignUpAndSignIn = async () => {
    let res = false;
    if (signIn == true) {
      res = await signInService(email, password);
    } else {
      res = await signUpService(firstName, lastName, email, password);
    }
    if (res == true) {
      navigate("/blog");
    }
  };
  return (
    <div className="grid grid-cols-1 bg-white p-20">
      <div className="grid grid-rows-2">
        <div className="flex justify-center font-semibold text-2xl">
          {signIn == true ? <div>Sign In</div> : <div>Create an account</div>}
        </div>
        <div>
          {signIn == false ? (
            <div className="flex justify-center text-login_ask_text_black">
              <div className="mr-2">Already have an account?</div>
              <Link to="/signin">
                <button className="underline font-semibold">Login</button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className="justify-center font-semibold">
        {signIn == false ? (
          <form>
            <div className="mb-6">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-form_label_text_black"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                className="border_gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="John"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-form_label_text_black"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                value={lastName}
                className="border_gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Doe"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />
            </div>
          </form>
        ) : null}
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-form_label_text_black"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className="border_border_gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="john.doe@company.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-form_label_text_black"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="border_border_gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          required
        />
      </div>
      <button
        type="button"
        className="text-btn_white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 h-10"
        onClick={async () => handleSignUpAndSignIn()}
      >
        {signIn == true ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
};
