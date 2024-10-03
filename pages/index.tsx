import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";

const IndexPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim()) {
      localStorage.setItem("username", username);

      router.push("/chat");
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="h-screen bg-background flex items-center justify-center">
      <div className="bg-white p-20 flex flex-col items-center gap-6 space-x-4 rounded-md">
        <h1 className="text-4xl capitalize">Add user name</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full mt-0"
        >
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={username}
            onChange={handleOnChange}
            placeholder="Username..."
            required
          />
          <button
            className="bg-mainColor text-white uppercase p-2 rounded"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;
