

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchCompanyData } from "../services/api";
import { companyMap } from "../utils/companyMap";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Compare = () => {
    const [company1, setCompany1] = useState("");
    const [company2, setCompany2] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("revenue");

    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);


    useEffect(() => {
        const saved = localStorage.getItem("compareData");

        if (saved) {
            const parsed = JSON.parse(saved);
            setData1(parsed.data1 || []);
            setData2(parsed.data2 || []);
            setType(parsed.type || "revenue");
            setCompany1(parsed.company1 || "");
            setCompany2(parsed.company2 || "");
        }
    }, []);

    const fetchData = async () => {
    try {
        setLoading(true);
        setErrorMsg("");        
        setData1([]);           
        setData2([]);

        if (!company1 || !company2) {
            setErrorMsg("Please enter companies");
            return;
        }

        const cik1 = companyMap[company1.toLowerCase()];
        const cik2 = companyMap[company2.toLowerCase()];

        if (!cik1 && isNaN(company1) && !cik2 && isNaN(company2)) {
            setErrorMsg(" companies are invalid");
            return;
        }

        if (!cik1 && isNaN(company1)) {
            setErrorMsg("Enter valid Company 1");
            return;
        }

        if (!cik2 && isNaN(company2)) {
            setErrorMsg("Enter valid Company 2");
            return;
        }

        const [res1, res2] = await Promise.all([
            fetchCompanyData(cik1, type),
            fetchCompanyData(cik2, type),
        ]);

        if (!res1?.length || !res2?.length) {
            setErrorMsg("No data found for selected companies");
            return;
        }

        setData1(res1);
        setData2(res2);

        localStorage.setItem(
            "compareData",
            JSON.stringify({
                data1: res1,
                data2: res2,
                type,
                company1,
                company2,
            })
        );

    } catch (err) {
        setErrorMsg("Something went wrong");
    } finally {
        setLoading(false);
    }
};
    const chartData = {
        labels: data1?.map((d) => d.fy) || [],
        datasets: [
            {
                label: company1 || "Company 1",
                data: data1?.map((d) => d.val) || [],
                borderColor: "#4CAF50",
                backgroundColor: "transparent",
                tension: 0.4,
            },
            {
                label: company2 || "Company 2",
                data: data2?.map((d) => d.val) || [],
                borderColor: "#2196F3",
                backgroundColor: "transparent",
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="container mt-4">
            <h3>Compare Companies</h3>


            <div className="d-md-flex gap-2 mb-3">
                <input
                    className="form-control"
                    placeholder="Company 1 (Apple)"
                    value={company1}
                    onChange={(e) => setCompany1(e.target.value)}
                />

                <input
                    className="form-control mt-2 mt-md-0"
                    placeholder="Company 2 (Tesla)"
                    value={company2}
                    onChange={(e) => setCompany2(e.target.value)}
                />

                <select
                    className="form-select w-auto mt-2 mt-md-0"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="revenue">Revenue</option>
                    <option value="assets">Assets</option>
                    <option value="liabilities">Liabilities</option>
                </select>

                <button className="btn btn-dark mt-2 mt-md-0" onClick={fetchData}>
                    {loading ? "Loading..." : "Compare"}
                </button>

            </div>

            {/* Chart */}
            {errorMsg && <p className="text-danger">{errorMsg}</p>}
            {loading && (
                <div className="text-center mt-3">
                    <div className="spinner-border text-dark"></div>
                    <p>Fetching data...</p>
                </div>
            )}

            {!errorMsg && data1.length > 0 && data2.length > 0 && (
                <div className="card p-4">
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
};

export default Compare;