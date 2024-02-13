import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Column, Pie } from "@ant-design/plots";
import { TeamOutlined } from "@ant-design/icons";
import { Card, Progress, Statistic } from "antd";
import Dropdown from "../components/user/Dropdown";
import { getAllCountries } from "../api/countries";
import { getUser } from "../api/services/userService";
import { showLoading, hideLoading } from "../utils/alertSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState([]);
  const [worldPopulation, setWorldPopulation] = useState(0);
  const logged = localStorage.getItem("userToken") !== null;

  useEffect(() => {
    if (logged) {
      const fetchUserData = async () => {
        try {
          const userResponse = await getUser();
          const encodedUserData = btoa(
            JSON.stringify(userResponse.data.userData)
          );
          localStorage.setItem("userData", encodedUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [logged]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        const data = await getAllCountries();
        dispatch(hideLoading());
        const sortedData = data.sort((a, b) => b.population - a.population);
        const top10Data = sortedData.slice(0, 10);
        const otherCountriesData = sortedData.slice(10);
        const formattedData = top10Data.map((country) => ({
          name: country.name.common,
          population: country.population,
          area: country.area,
        }));
        const othersData = {
          name: "Others",
          population: otherCountriesData.reduce(
            (total, country) => total + country.population,
            0
          ),
          area: otherCountriesData.reduce(
            (total, country) => total + country.area,
            0
          ),
        };
        const totalWorldPopulation = data.reduce(
          (total, country) => total + country.population,
          0
        );
        setWorldPopulation(totalWorldPopulation);
        setCountryData([
          ...formattedData,
          othersData,
          { name: "World", population: totalWorldPopulation },
        ]);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    fetchData();
  }, [dispatch]);

  const barConfig = {
    data: countryData,
    xField: "name",
    yField: "population",
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      name: {
        alias: "Country",
      },
      population: {
        alias: "Population",
      },
    },
  };

  const areaPieConfig = {
    appendPadding: 10,
    data: countryData,
    angleField: "area",
    colorField: "name",
    radius: 0.8,
  };

  return (
    <div className="container">
      <div className="fixed top-4 left-4 z-50">
        <Dropdown />
      </div>
      <div className="text-center">
        <h2 className="text-3xl text-steel-blue font-semibold pt-10">
          Dashboard
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-4">
        <Card className="p-4">
          <h2 className="text-2xl font-bold mb-4">
            Top 10 Countries by Population
          </h2>
          <Column {...barConfig} />
        </Card>
        <Card className="p-4">
          <h2 className="text-2xl font-bold mb-4">Area Distribution</h2>
          <Pie {...areaPieConfig} />
        </Card>
      </div>
      <div className="p-5 mt-4">
        <h2 className="text-3xl font-semibold mb-5">
          World Population Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {countryData.map((country) => (
            <Card
              key={country.name}
              className="p-1 border border-gray-200 rounded-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-steel-blue">
                {country.name}
              </h2>
              <div className="flex justify-center items-center mb-5 text-xs">
                <Statistic
                  value={country.population}
                  prefix={<TeamOutlined />}
                  className="text-xs"
                />
              </div>
              <div className="flex justify-center items-center">
                <Progress
                  type="dashboard"
                  percent={Math.round(
                    (country.population / worldPopulation) * 100
                  )}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
