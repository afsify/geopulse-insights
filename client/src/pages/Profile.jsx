import { Avatar, Card, Input, Button } from "antd";
import imageLinks from "../assets/images/imageLinks";
import Dropdown from "../components/user/Dropdown";
import { useEffect, useState } from "react";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const logged = localStorage.getItem("userToken") !== null;

  useEffect(() => {
    if (logged) {
      const dummyUserData = {
        name: "Demo Name",
        email: "demo@example.com",
        location: "New York, USA",
        bio: "Passionate about coding and creating amazing web applications.",
        skills: "React, JavaScript, HTML, CSS",
      };
      setUserData(dummyUserData);
      setName(dummyUserData.name);
      setEmail(dummyUserData.email);
      setLocation(dummyUserData.location || "");
      setBio(dummyUserData.bio || "");
      setSkills(dummyUserData.skills || "");
    }
  }, [logged]);

  const handleUpdateClick = () => {
    setUserData({ ...userData, name, email, location, bio, skills });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="fixed top-4 left-4 z-50">
        <Dropdown />
      </div>
      <Card
        title={<h1 className="text-3xl font-semibold">Profile</h1>}
        className="w-full mx-auto mt-20 p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full p-4 flex flex-col justify-center items-center">
            <Avatar
              size={200}
              src={userData?.image || imageLinks.profile}
              alt="User Avatar"
            />
            <h2 className="mt-4 font-bold text-3xl">{userData?.name}</h2>
            <p className="text-lg text-gray-300">{userData?.email}</p>
            <div className="flex flex-col md:flex-row md:justify-between gap-x-2 mt-4">
              <Card
                className="text-center mb-4 md:mb-0"
                style={{ width: "100%" }}
              >
                <p className="text-gray-500">{bio}</p>
              </Card>
              <Card className="text-center" style={{ width: "100%" }}>
                <p className="text-gray-500">{location}</p>
              </Card>
            </div>
            <div className="mt-4 text-center">
              {skills && (
                <div className="flex flex-wrap justify-center">
                  {skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-black px-4 py-1 m-1 rounded"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-4">
              <label className="text-md font-medium">Name</label>
              <Input
                size="large"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="text-md font-medium">Email</label>
              <Input
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="text-md font-medium">Location</label>
              <Input
                size="large"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your Location"
              />
            </div>
            <div className="mb-4">
              <label className="text-md font-medium">Bio</label>
              <Input.TextArea
                size="large"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                autoSize={{ minRows: 4 }}
              />
            </div>
            <div className="mb-4">
              <label className="text-md font-medium">Skills</label>
              <Input
                size="large"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Your Skills (comma-separated)"
              />
            </div>
            <Button
              size="large"
              className="bg-blue-500 hover:bg-blue-700 w-full text-white"
              onClick={handleUpdateClick}
            >
              Update
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
