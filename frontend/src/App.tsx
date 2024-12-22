// Routes
import { NavLink } from "react-router-dom";
import MyCustomRouter from "./routes";

function App() {
  return (
    <section style={{ height: "100%" }}>
      <Header />
      <main>
        <MyCustomRouter />
      </main>
    </section>
  );
}

export default App;

function Header() {
  return (
    <header>
      <nav style={{ display: "flex", gap: "30px", padding: "20px" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
