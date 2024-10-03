import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ChatBox from "../components/ChatBox";
import "../app/globals.css";

const ChatPage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (!savedUsername) {
      router.push("/");
    } else {
      setUsername(savedUsername);
    }
  }, [router]);

  if (!username) return <div>Loading...</div>;

  return (
    <div className="bg-background">
      <div className="h-screen flex flex-col justify-between p-6">
        <h1 className="flex justify-end text-white mb-6">{username}</h1>
        <ChatBox username={username} />
      </div>
    </div>
  );
};

export default ChatPage;
