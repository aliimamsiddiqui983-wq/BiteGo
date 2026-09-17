🍔 BiteGo - Food Delivery Web Application
BiteGo is a full-stack food deliver
y web application built using the MERN stack. It allows customers to browse food items, manage their cart, place orders, provide delivery details, and make online payments through Cashfree. It also includes a separate admin panel for managing food items and customer orders.

🚀 Live Project
Frontend: Add your deployed frontend URL here

Backend API: Add your deployed backend URL here

Admin Panel: Add your deployed admin panel URL here

Replace the placeholders above with your actual deployment links before publishing the README.

📌 About the Project
BiteGo is designed to provide a simple and user-friendly food ordering experience.

Customers can:

Create an account and log in

Browse available food items

Add food items to the cart

Increase or decrease item quantities

View cart subtotal, delivery fee, and total amount

Enter delivery information

Place an order

Pay online using Cashfree

View their previous orders

Track order status

The project also provides a dedicated Admin Login and Admin Panel, where administrators can manage food items and orders.

✨ Features
👤 Customer Features
User registration

User login/logout

JWT-based authentication

Password hashing with bcrypt

Browse food menu

Food item display with images and details

Add items to cart

Update cart quantities

Remove items from cart

Automatic cart total calculation

Delivery charge calculation

Delivery information form

Order placement

Cashfree online payment

View order history

View order status

👨‍💼 Admin Features
Separate Admin Login

Admin authentication using JWT

Protected admin access

Add food items

Manage food items

Delete food items

View all customer orders

Update order status

Manage the food delivery workflow

💳 Payment Features
BiteGo uses Cashfree Payment Gateway for online payments.

The current development setup uses the Cashfree Sandbox environment for testing.

Payment flow:

Customer
   ↓
Place Order
   ↓
BiteGo Backend
   ↓
Create Cashfree Order
   ↓
Receive Payment Session ID
   ↓
Cashfree Checkout
   ↓
Payment
   ↓
Order Payment Verification
🛠️ Technologies Used
Frontend
React.js

JavaScript (ES6+)

HTML5

CSS3

React Router

Axios

React Toastify

React Icons

Vite

Backend
Node.js

Express.js

JavaScript

REST API

JWT

bcrypt

Validator

Multer

Axios

Database
MongoDB

Mongoose

Payment Gateway
Cashfree Payment Gateway

cashfree-pg

Development Tools
Git

GitHub

VS Code

Postman

MongoDB Compass

npm

🏗️ Project Architecture
BiteGo
│
├── client/                         # Customer Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── admin/                          # Admin Panel
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
│
├── server/                         # Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
Folder names can be adjusted if your actual GitHub repository uses different names.

🔐 Authentication
BiteGo uses JWT (JSON Web Token) for authentication.

Customer Login
Customer login creates a JWT token containing the user's ID and authentication information.

Admin Login
Admin login uses a separate endpoint and checks whether the user's MongoDB document contains:

role: "admin"
The admin token is stored separately from the customer token.

This prevents a normal customer account from being treated as an administrator.

💳 Cashfree Integration
The backend uses the Cashfree Node.js SDK:

npm install cashfree-pg
The backend creates a Cashfree order using:

Order amount

Order currency

Unique order ID

Customer ID

Customer name

Customer email

Customer phone

Return URL

Cashfree then provides a:

payment_session_id
The frontend uses this payment session to open the Cashfree checkout.

Environment Variables
Create a .env file inside the server directory:

PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

CASHFREE_CLIENT_ID=your_cashfree_sandbox_client_id
CASHFREE_CLIENT_SECRET=your_cashfree_sandbox_client_secret
The project currently initializes Cashfree in Sandbox mode during development.

Important
Never upload your .env file to GitHub.

Add:

.env
to your .gitignore.

📦 Installation
1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd BiteGo
2. Install Backend Dependencies
cd server
npm install
Start the backend:

npm run server
The backend runs on:

http://localhost:4000
3. Install Frontend Dependencies
Open another terminal:

cd client
npm install
Start the frontend:

npm run dev
The frontend normally runs on:

http://localhost:5173
4. Install Admin Panel Dependencies
If your repository contains a separate admin application:

cd admin
npm install
Start it using the script defined in its package.json.

For the current local setup, the admin application has been used on:

http://localhost:5174
▶️ Running the Project
You need to run the applications separately unless you have configured a concurrent development script.

Terminal 1 - Backend
cd server
npm run server
Terminal 2 - Customer Frontend
cd client
npm run dev
Terminal 3 - Admin Panel
cd admin
npm run dev
🌐 API Endpoints
User APIs
Method	Endpoint	Description
POST	/api/user/register	Register a new customer
POST	/api/user/login	Customer login
POST	/api/user/admin-login	Admin login
Food APIs
Method	Endpoint	Description
POST	/api/food/add	Add food item
GET	/api/food/list	Get food items
POST	/api/food/remove	Remove food item
Order APIs
Method	Endpoint	Description
POST	/api/order/place	Create order and Cashfree payment session
POST	/api/order/verify	Verify/update payment status
POST	/api/order/userorders	Get customer's orders
GET/POST	/api/order/list	Get orders for admin
POST	/api/order/status	Update order status
Exact HTTP methods and paths should match the route files in your deployed version.

🛒 Order Flow
1. Customer logs in
        ↓
2. Browses food items
        ↓
3. Adds items to cart
        ↓
4. Opens cart
        ↓
5. Proceeds to checkout
        ↓
6. Enters delivery information
        ↓
7. Backend creates BiteGo order
        ↓
8. Backend creates Cashfree payment order
        ↓
9. Cashfree checkout opens
        ↓
10. Customer completes payment
        ↓
11. Payment is verified
        ↓
12. Order status is updated
        ↓
13. Customer can view the order
👨‍💼 Admin Workflow
Admin Login
     ↓
Admin Authentication
     ↓
Admin Panel
     ↓
Manage Food Items
     ↓
View Customer Orders
     ↓
Update Order Status
🗄️ Database
BiteGo uses MongoDB with Mongoose.

The application stores information such as:

Users

Admin users

Food items

Cart data

Customer orders

Delivery information

Payment status

Order status

🔒 Security
The project includes several security-related practices:

Password hashing using bcrypt

JWT-based authentication

Separate customer and admin authentication

Protected admin functionality

Environment variables for sensitive credentials

Server-side payment order creation

Input validation using Validator

CORS configuration

Sensitive credentials excluded from GitHub

📱 Responsive Design
The customer-facing application is designed to work across different screen sizes, including:

Desktop

Laptop

Tablet

Mobile

CSS media queries and responsive layouts are used to improve the user experience across devices.

🧪 Testing
During development, APIs can be tested using tools such as:

Postman

Browser Developer Tools

MongoDB Compass

Cashfree Sandbox

Cashfree Sandbox should be used for payment testing instead of real card/payment credentials.

🚀 Deployment
The application can be deployed using platforms such as:

Render

Vercel

Netlify

MongoDB Atlas

For production deployment, configure environment variables on the hosting platform instead of uploading .env files.

Example production variables:

PORT=4000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=your_production_frontend_url
CASHFREE_CLIENT_ID=your_production_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_production_cashfree_client_secret
📸 Screenshots
Add screenshots of your actual BiteGo application here:

screenshots/
├── home.png
├── menu.png
├── cart.png
├── place-order.png
├── cashfree-payment.png
├── my-orders.png
├── admin-login.png
└── admin-panel.png
Example:

![BiteGo Home Page](screenshots/home.png)
🎯 Learning Outcomes
Through this project, I gained practical experience with:

Building a full-stack MERN application

React component development

React state and Context API

REST API development

Node.js and Express.js

MongoDB and Mongoose

JWT authentication

Password hashing with bcrypt

Customer and admin role management

Cart and order management

Payment gateway integration

Cashfree Sandbox payment testing

API testing

Git and GitHub

Responsive web design

Frontend-backend integration

🔮 Future Improvements
Possible future improvements include:

Real-time order tracking

Email/SMS order notifications

Product search

Advanced food filtering

Customer reviews and ratings

Coupon and discount system

Order cancellation

Better admin analytics/dashboard

Delivery partner module

Production payment integration

Improved payment webhook verification

👨‍💻 Developer
Ali Imam Siddiqui

B.Tech Computer Science & Engineering

Interested in MERN Stack Development, Web Development, React.js, Node.js, Express.js, and MongoDB.

⭐ Support
If you find this project useful, consider giving the repository a ⭐ on GitHub.