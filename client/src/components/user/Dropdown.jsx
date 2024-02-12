import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { userPath } from "../../routes/routeConfig";
import { userActions } from "../../utils/userSlice";
import imageLinks from "../../assets/images/imageLinks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  FlagOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function Dropdown() {
  const menuRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const logged = localStorage.getItem("userToken") !== null;

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  useEffect(() => {
    if (logged) {
      const encodedUserData = localStorage.getItem("userData");
      if (encodedUserData) {
        const parsedUserData = JSON.parse(atob(encodedUserData));
        setUserData(parsedUserData);
      }
    }
  }, [logged]);

  return (
    <div className="relative">
      <div
        className="cursor-pointer hover:scale-110 duration-300"
        onClick={logged ? () => setOpen(!open) : () => navigate(userPath.login)}
      >
        {logged && userData && userData.image ? (
          <div className="overflow-hidden rounded-full w-11 h-11 mx-auto shadow-md shadow-black ">
            <img src={userData.image} alt="User" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-full w-11 h-11 mx-auto shadow-md shadow-black ">
            <img src={imageLinks.profile} alt="Default User" />
          </div>
        )}
      </div>
      {logged && userData && (
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute top-0 left-0 z-50 mt-14 w-48 p-4 text-steel-blue shadow-md bg-pine-green shadow-black rounded-lg bg-dark-purple`}
          ref={menuRef}
        >
          <h3 className="text-center text-lg uppercase font-semibold text-gray-400">
            <span>{userData.name}</span>
            <br />
            <span className="text-sm font-normal normal-case font-sans text-gray-500">
              {userData.email}
            </span>
          </h3>
          <ul className="mt-4 space-y-2">
            <DropdownItem
              text="Home"
              icon={<HomeOutlined />}
              path={userPath.home}
            />
            <DropdownItem
              text="Profile"
              icon={<UserOutlined />}
              path={userPath.profile}
            />
            <DropdownItem
              text="Country"
              icon={<FlagOutlined />}
              path={userPath.country}
            />
            <DropdownItem
              text="Settings"
              icon={<SettingOutlined />}
              path={userPath.settings}
            />
            <li
              onClick={() => {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userData");
                setUserData(null);
                dispatch(userActions.userLogout());
                navigate(userPath.login);
              }}
              className="flex items-center cursor-pointer px-2 py-1 hover:bg-light-red hover:text-red-500 rounded-md space-x-2"
            >
              <LogoutOutlined />
              <span className="font-medium hover:text-red-500">Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ text, icon, path }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  return (
    <li
      onClick={() => navigate(path)}
      className={`${
        isActive && "bg-light-green text-blue-500 font-bold"
      } flex items-center cursor-pointer px-2 py-1 hover:bg-light-blue hover:text-dark-purple rounded-md space-x-2`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </li>
  );
}

DropdownItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default Dropdown;
