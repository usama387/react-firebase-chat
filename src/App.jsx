import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login//Login";
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";

const App = () => {
  // destructuring from useUserStore zustand state management of user in lib folder
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  // to keep track of authentication status login / logout
  useEffect(() => {
    // by passing auth to this method it returns the user
    const unSub = onAuthStateChanged(auth, (user) => {
      // whenever the state changes fetch function is called by passing its uid in zustand config in useUserStore.js
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
