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
        result = result.slice(-20);

        res.json(result);


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "failed to fetch data" })

    }

})


app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
