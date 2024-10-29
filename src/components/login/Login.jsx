import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  // state for avatar from input
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  // updates the avatar state with target event in file input
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // api loading state
  const [loading, setLoading] = useState(false);

  // triggered when login is pressed
  const handleLogin = (e) => {
    e.preventDefault();
  };

  // triggered when signUp is pressed
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    // using this variable i can reach to EmailAuthCredential, password etc
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // this variable passes avatar state file upload function
      const imageUrl = await upload(avatar.file);

      // creates the user with a  block a list in db using credentials and id from createUserWithEmailAndPassword
      await setDoc(doc(database, "users", response.user.uid), {
        username,
        email,
        id: response.user.uid,
        avatar: imageUrl,
        blocked: [],
      });

      // on login chats will be fetched
      await setDoc(doc(database, "userChats", response.user.uid), {
        chats: [],
      });

      toast.success("Account created! You may login now!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>

      {/* Sign Up Logic */}
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
