import React, { useContext, useEffect } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
    const { data, loading, error, type } = useContext(FinanceContext);

// chart data
    const chartData = {
        labels: data && data.length > 0 ? data.map((d) => d.fy) : [],
        datasets: [
            {
                label: "Financial Data",
                data: data && data.length > 0 ? data.map((d) => d.val) : [],
                borderColor: "#4CAF50",       
                tension: 0.4,
            },
        ],
    };

    const downloadCSV = () => {
        if (!data || data.length === 0) return;

        const csv = data.map(d => `${d.fy},${d.val}`).join("\n");

        const finalCSV = `Year,Value\n${csv}`;
        const blob = new Blob([finalCSV], { type: "text/csv" });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "financial-data.csv";

        a.click();
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Financial Overview</h3>

            {loading && <p>Loading...</p>}

            {error && <p className="text-danger">{error}</p>}

            {!loading && (!data || data.length === 0) && (
                <p>No data available. Please search a company first.</p>
            )}
            {data && data.length > 0 && (
                <>
                    {/* Chart */}
                    <div className="card shadow-sm p-4 mb-4">
                        <Line data={chartData} />
                    </div>
                    <button onClick={downloadCSV} className="btn btn-success mb-3">
                        Download CSV
                    </button>
                    {/* Table */}
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-3 text-center fw-bold">{type.toUpperCase()} DATA</h5>
                        <table className="table table-striped ">
                            <thead className="table-dark">
                                <tr>
                                    <th>Year</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.fy}</td>
                                        <td>{item.val?.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
