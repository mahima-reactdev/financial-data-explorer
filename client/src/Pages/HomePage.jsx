import React, { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import { companyMap } from "../utils/companyMap";

const Home = () => {
    const { getCompany, loading} = useContext(FinanceContext);

    const [search, setSearch] = useState("apple");
    const [type, setType] = useState("revenue");
    const navigate = useNavigate()
console.log(getCompany)
    const handleSearch = async () => {
        let cik = companyMap[search.toLowerCase()] || search;
        // console.log(cik)
        if (!search.trim()) {
            alert("Please enter a company name or CIK");
            return;
        }

        if (cik) {
            await getCompany(cik, type, search);
            navigate("/dashboard");
        } else {
            alert("Company not found");
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center ">
            <h1 className="mb-4 fw-bold">Financial Data Explorer</h1>

            <div className="d-md-flex gap-2 w-75 justify-content-center">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search company or CIK (e.g., Apple)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}

                />

                <select
                    className="form-select w-md-auto w-100 mt-2 mt-md-0"
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="revenue">Revenue</option>
                    <option value="assets">Assets</option>
                    <option value="liabilities">Liabilities</option>
                </select>

                <button className="btn btn-dark mt-2 mt-md-0 w-100 w-md-auto " onClick={handleSearch}>
                    {loading ? "Loading....." : "Search"}
                </button>

            </div>
            <div className="d-flex gap-3 mt-3">
                {["Apple", "Tesla", "Microsoft"].map((company) => (
                    <button
                        key={company}
                        className="btn btn-outline-primary"
                        onClick={() => {
                            setSearch(company);
                        }}
                    >
                        {company}
                    </button>
                ))}
            </div>


        </div>
    );
};

export default Home;