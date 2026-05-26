# Trendora – Modern Full Stack Ecommerce Store

Trendora is a modern full stack ecommerce web application built using the MERN stack. The project focuses on delivering a premium shopping experience with a beautiful responsive UI, scalable architecture, secure authentication system, and powerful admin dashboard.

The application is designed with real-world ecommerce flow in mind and includes separate user and admin experiences, optimized APIs, protected routes, cloud image uploads, live search functionality, and complete order management.

---

# 🚀 Live Demo

Coming Soon...

---

# ✨ Features

## 👤 User Features

* JWT Authentication with secure cookie-based login system
* Role-based access control (Admin & User)
* Fully responsive modern UI/UX built with React & Tailwind CSS
* Live product search functionality
* Individual cart system for every user stored in MongoDB
* Buy Now functionality for guest users
* Separate checkout flow for authenticated users and guests
* Order placement with Cash on Delivery
* Real-time order status tracking UI
* Dynamic navbar showing logged-in user information
* Optimized product browsing experience
* Smooth navigation using modern React routing

---

## 🛠️ Admin Features

### 📊 Admin Dashboard

* Total Revenue overview
* Total Orders count
* Total Products count
* Total Users count
* Recent Orders section
* Order statistics:

  * Completed Orders
  * Pending Orders
  * Cancelled Orders

---

### 📦 Product Management

* Create Product
* Edit Product
* Delete Product
* Image preview while creating/updating products
* Cloudinary image upload integration
* Live search functionality for products

---

### 👥 User Management

* View all users
* Delete users
* Live user search functionality

---

### 📑 Order Management

* View all orders
* Delete orders
* Update order status
* Order status updates reflected instantly on frontend
* Live order search functionality

---

# 🧠 Core Highlights

* Scalable folder structure for both frontend and backend
* Protected admin routes
* Optimized API & database queries
* Clean component architecture
* Secure backend authentication flow
* Cloudinary integration for image storage
* MongoDB database integration
* Responsive design across all devices

---

# 🧰 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* Multer
* Cloudinary

---

# 📁 Project Structure

```bash
Trendora/
│
├── ecommerce/
│   
│   
│   
│   
│   
│
├── backend/
│   
│   
│   
│   
│   
│   
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=

MONGO_URI=

JWT_SECRET=

CLIENT_URL=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

---

## Frontend `.env`

```env
VITE_API=
```

---

# 💻 Installation

## Clone Repository

```bash
git clone your-repository-link
```

---

## Install Frontend Dependencies

```bash
cd frontend
npm install
npm install axios
npm install tailwindcss@latest postcss
npm install react router dom
```

---

## Install Backend Dependencies

```bash
cd backend
npm install
npm install multer
npm install cloudinary
npm install streamlit
```

---

# ▶️ Run Project

## Start Backend

```bash
cd backend
node server.js
```

---

## Start Frontend

```bash
cd ecommerce
npm run dev
```

---

# 🔐 Authentication System

Trendora uses:

* JWT Authentication
* HTTP-only Cookies
* Protected Routes
* Role-based Authorization

Only the admin can access admin dashboard routes and management functionalities.

---

# ☁️ Image Upload System

Product images are uploaded using:

* Multer
* Cloudinary

Images are securely stored in the cloud and optimized for production deployment.

---

# 📦 Order Tracking System

Customers can track order progress through a modern tracking UI showing different order states such as:

* Pending
* Confirmed
* Processing
* Shipped
* Delivered
* Cancelled

---

# 🎯 Future Improvements

* Online Payment Gateway Integration
* Product Reviews & Ratings
* Email Notifications
* Coupon System
* Advanced Filtering & Sorting
* Admin Analytics Charts

---

# 👨‍💻 Developer

Developed by Ahmad.

Trendora was built as a complete modern ecommerce solution with production-ready architecture, responsive design, and scalable full stack development practices.
