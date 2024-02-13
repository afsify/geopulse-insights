import { useState, useEffect, Fragment } from "react";
import { Card, Spin, Input, Button, Select } from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import Dropdown from "../components/user/Dropdown";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../utils/alertSlice";
import { getAllCountries } from "../api/countries";

const { Option } = Select;

function Country() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [loadedCountries, setLoadedCountries] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        const data = await getAllCountries();
        dispatch(hideLoading());
        const formattedData = data.map((country) => ({
          name: country.name.common,
          population: country.population,
          flags: country.flags,
          region: country.region,
          capital: country.capital,
        }));
        setCountryData(formattedData);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLoadMore = () => {
    setLoadedCountries((prev) => prev + 8);
  };

  const renderCountryCards = () => {
    const filteredCountries = countryData
      .filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (regionFilter === "All" || country.region === regionFilter)
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, loadedCountries);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4">
        {filteredCountries.map((country) => (
          <Card
            key={country.name}
            className="shadow-md transition transform hover:scale-105"
          >
            <img
              alt={country.name}
              src={country.flags.png}
              className="w-full border object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{country.name}</h3>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearchInput = () => {
    setSearchTerm("");
  };

  return (
    <div className="container">
      <div className="fixed top-4 left-4 z-50">
        <Dropdown />
      </div>
      <div className="flex flex-col items-center p-4">
        <h2 className="text-3xl font-semibold text-steel-blue mt-8">
          Countries
        </h2>
        <div className="flex justify-between mb-4 w-full mt-4">
          <Select
            size="large"
            defaultValue="All"
            className="w-44"
            onChange={(value) => setRegionFilter(value)}
          >
            <Option value="All">All Regions</Option>
            <Option value="Africa">Africa</Option>
            <Option value="Americas">Americas</Option>
            <Option value="Asia">Asia</Option>
            <Option value="Europe">Europe</Option>
            <Option value="Oceania">Oceania</Option>
          </Select>
          <Input
            placeholder="Search Country"
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="rounded-md py-2 w-44"
            prefix={
              <SearchOutlined
                style={{ color: "#1890ff", marginRight: "5px" }}
              />
            }
            suffix={
              searchTerm && (
                <CloseCircleOutlined
                  style={{ color: "#1890ff", cursor: "pointer" }}
                  onClick={clearSearchInput}
                />
              )
            }
          />
        </div>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Fragment>
            <div className="flex flex-wrap justify-around items-center p-4">
              {renderCountryCards()}
            </div>
            <div className="text-center p-4">
              <Button
                size="large"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoadMore}
              >
                Load More
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default Country;
