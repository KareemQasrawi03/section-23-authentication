import {
  Outlet,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED"){
        submit(null, { action: "/logout", method: "post" });
        return
    }
    const tokenDuration = getTokenDuration()
    console.log(tokenDuration)
      setTimeout(() => {
        // this is same btn logout {form} make automatic logout if fench 1 h
        submit(null, { action: "/logout", method: "post" });
      }, tokenDuration);// 1 houre

  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
