import { Avatar, Card, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { CameraOutlined } from "@ant-design/icons";
import imageLinks from "../assets/images/imageLinks";
import Dropdown from "../components/user/Dropdown";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const logged = localStorage.getItem("userToken") !== null;

  useEffect(() => {
    if (logged) {
      const encodedUserData = localStorage.getItem("userData");
      if (encodedUserData) {
        const parsedUserData = JSON.parse(atob(encodedUserData));
        setUserData(parsedUserData);
        setName(parsedUserData.name);
        setEmail(parsedUserData.email);
      }
    }
  }, [logged]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleUpdateClick = () => {
    setUserData({ ...userData, name, email });
    setEditing(false);
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="fixed top-4 left-4 z-50">
        <Dropdown />
      </div>
      <Card className="w-96 text-center mt-20 p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
        <div className="relative">
          {editing && (
            <div className="absolute right-2 bottom-2">
              <Button size="large" shape="circle" icon={<CameraOutlined />} />
            </div>
          )}
          <Avatar
            size={200}
            src={userData?.image || imageLinks.profile}
            alt="User Avatar"
          />
        </div>
        {editing ? (
          <div className="mt-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mb-2"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mb-4"
            />
            <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={handleUpdateClick}>
              Update
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mt-4">{userData?.name}</h2>
            <p className="text-gray-500">{userData?.email}</p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white" onClick={handleEditClick}>
              Edit Profile
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}

export default Profile;
