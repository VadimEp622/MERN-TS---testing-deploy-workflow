import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Loader } from "./cmps/_reuseable-cmps/loader.tsx";

// TODO: handle error handling that might occur during the dynamic import process

const Home = lazy(() =>
  import("./pages/home.tsx").then((module) => ({ default: module.Home }))
);
const About = lazy(() =>
  import("./pages/about.tsx").then((module) => ({ default: module.About }))
);

const Users = lazy(() =>
  import("./pages/users.tsx").then((module) => ({ default: module.Users }))
);

export default function MyCustomRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "about",
      element: <About />,
    },
  ]);

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}
