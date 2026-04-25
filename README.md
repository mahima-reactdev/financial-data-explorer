---------------- Overview ----------------------------

A web application that fetches real financial data from the SEC EDGAR API and displays key metrics like revenue, assets, and liabilities in a clean and interactive UI.

Users can search companies, view data in charts and tables, compare companies, and export results.

------------------- Tech Stack --------------------------

Frontend: React.js, Bootstrap
State Management: Context API
Charts: Chart.js
Backend: Node.js, Express
API: SEC EDGAR API
Storage: localStorage

----------------- Features -------------------------------

Search company by name or CIK
View financial data (Revenue, Assets, Liabilities)
Interactive chart visualization
Compare two companies
Export data as CSV
Data persistence using localStorage
Input validation and error handling
Responsive UI (mobile + desktop)

------------------Setup Instructions--------------------------
Clone the repository

git clone https://github.com/mahima-reactdev/financial-data-explorer.git

Install backend dependencies
cd server
npm install

Install frontend dependencies
cd client
npm install

Start backend server
npm run dev

Start frontend
npm start
OR
npm run dev

---------------------- API-----------------------------------------------

SEC EDGAR API
https://data.sec.gov/api/xbrl/companyfacts/CIK{number}.json

-----------------------Limitations--------------------------------------

Limited predefined companies
No authentication system
Data is trimmed for better performance
