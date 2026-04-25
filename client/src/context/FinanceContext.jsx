
import { createContext, useEffect, useState } from "react";
import { fetchCompanyData } from "../services/api";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [type, setType] = useState("");

    // 🔹 Load data when page refresh
    useEffect(() => {
        const saved = localStorage.getItem("financeData");

        if (saved) {
            const parsed = JSON.parse(saved);
            setData(parsed.data);
            setType(parsed.type);
        }
    }, []);

    const getCompany = async (cik, type) => {
        setLoading(true);
        setError("");

        try {
            const result = await fetchCompanyData(cik, type);

            setData(result);
            setType(type);

            // 🔹 Save data in localStorage
            localStorage.setItem(
                "financeData",
                JSON.stringify({ data: result, type })
            );

        } catch (error) {
            setError("failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FinanceContext.Provider value={{ data, loading, error, type, getCompany }}>
            {children}
        </FinanceContext.Provider>
    );
};