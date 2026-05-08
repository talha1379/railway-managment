import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="auth-btn">Login</button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="auth-btn signup-btn">Signup</button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      {/* HERO */}
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />

          <img src={reactLogo} className="framework" alt="React logo" />

          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div>
          <h1>Get Started</h1>

          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </section>
    </>
  );
}

export default App;
