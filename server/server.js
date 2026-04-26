const express = require('express');
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/company/:cik/:type", async (req, res) => {
    try {
        let { cik } = req.params;
        cik = cik.padStart(10, "0");

        let type = req.params.type;
        const response = await axios.get(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`, {
            headers: {
                "User-Agent": "mahimapatel010@gmail.com"
            }
        })
        const data = response.data.facts["us-gaap"];
        //    console.log (data);
        let result = [];
        if (type === "revenue") {
            result = data?.Revenues?.units?.USD || [];
        } else if (type === "assets") {
            result = data?.Assets?.units?.USD || [];
        } else if (type === "liabilities") {
            result = data?.Liabilities?.units?.USD || [];
        } else {
            return res.status(400).json({
                error: "Invalid type. Use revenue, assets, or liabilities",
            });
        }

        if (!result.length) {
            return res.status(404).json({ error: "No data found" });
        }
        // result = result.slice(-20);
        result = result.filter(item => item.form === "10-K");

        const uniqueMap = new Map();

        result.forEach(item => {
            uniqueMap.set(item.fy, item); 
        });

        result = Array.from(uniqueMap.values());

        // sort by year 
        result.sort((a, b) => b.fy - a.fy);

        // take last 10 years
        result = result.slice(0, 20);
        // console.log(result)

        res.json(result);


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "failed to fetch data" })

    }

})

app.listen(8080, () => {
    console.log("server running on http://localhost:8080")
})

