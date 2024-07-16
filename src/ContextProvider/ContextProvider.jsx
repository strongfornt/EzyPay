import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hook/useAxiosPublic";

// import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function ContextProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [isUserExist, setIsUserExist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  const getUser = async (isUserExist) => {
    const { data } = await axiosPublic.get(
      `/login?email=${isUserExist?.userId}&pin=${isUserExist?.pin}`
    );
    // console.log(data);
    if (data) {
      setUser(data);
    }

    // setLoading(false);
  };
  console.log(user);

  useEffect(() => {
    const isExist = sessionStorage.getItem("userInfo");
    const isExistUser = JSON.parse(isExist);
    console.log(isExistUser);
    // console.log(isExistUser);
    // setIsUserExist(isExistUser);
  
    if (isExistUser) {
      getUser(isExistUser);
    }
    // console.log(isExistUser);
    //   setIsUserExist(isExistUser);

    // if (isUserExist) {
    //   getUser();
    // }

    // if (user) {
    //   setLoading(false);

    //   // if user exist then issue a token ===============================
    //   // const userEmail = currentUser?.email || user?.email;
    //   // const loggedUser = { email: userEmail };
    // axiosPublic.post("/jwt", {user: emailOrNumber} ).then((res) => {
    //   if (res.data.token) {
    //     localStorage.setItem("access-token", res.data.token);
    //   }
    // });

    // } else {
    //   localStorage.removeItem("access-token");
    //   setUser(null);
    //   setLoading(false);
    // }
  }, []);
  // console.log(user);
  // console.log(isUserExist);
  const authInfo = {
    setIsUserExist,
    getUser,
    user
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
}
