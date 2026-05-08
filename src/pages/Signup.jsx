import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">
        <h1 className="text-3xl font-bold text-center mb-5">Signup</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">Create Account</button>
      </div>
    </div>
  );
}

export default Signup;
