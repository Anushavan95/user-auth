import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Sign from "./Components/SignPages/Sign";
import SignUp from "./Components/SignPages/Sign-up";
import User from "./Components/Users/User";
import Users from "./Components/Users/Users";

function App() {
  const [userSign, setUserSign] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/user" element={<User userSign={userSign} />} />
          <Route
            index
            element={<Sign userSign={userSign} setUserSign={setUserSign} />}
          />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
