# 🍽️ FoodMart – Full-Stack Meal Ordering Platform

**"Discover, Order & Manage Delicious Meals Seamlessly"**

## 🌍 Live Demo

Frontend: https://foodmart-frontend.vercel.app

---

## 📌 Project Overview

FoodMart is a full-stack, role-based meal ordering web application designed to simulate a real-world food delivery platform. The system allows customers to browse meals, place orders, and track delivery status, while providers manage their menus and fulfill orders. Admins oversee the entire platform including users, orders, and categories.

This project demonstrates modern full-stack development using scalable architecture, RESTful API design, authentication & authorization, and structured relational database modeling.

The application is built using **Next.js (App Router)** on the frontend and **Node.js + Express + Prisma + PostgreSQL** on the backend.

---

## 🎯 Project Goals

- Build a production-style full-stack application  
- Implement Role-Based Access Control (RBAC)  
- Design relational database schemas  
- Develop RESTful APIs  
- Handle authentication and protected routes  
- Simulate real-world order lifecycle workflow  
- Practice scalable backend and clean frontend architecture  

---

## 👥 Roles & Permissions

| Role | Description | Key Permissions |
|------|------------|----------------|
| **Customer** | Users who order meals | Browse meals, add to cart, place orders, track status, leave reviews |
| **Provider** | Food vendors/restaurants | Manage menu, view orders, update order status |
| **Admin** | Platform moderators | Manage users, monitor orders, manage categories |

---

## ✨ Features

### 🌐 Public Features
- Browse all meals and providers  
- Filter meals by category and price  
- View provider profiles with menus  

### 👤 Customer Features
- Register and login  
- Add meals to cart  
- Checkout with delivery address (Cash on Delivery)  
- Track order status  
- Leave reviews  
- Manage profile  

### 🍳 Provider Features
- Register and login as provider  
- Add, edit, and delete menu items  
- View incoming orders  
- Update order status  

### 🛡️ Admin Features
- View all users  
- Suspend/activate users  
- Monitor all orders  
- Manage food categories  

---

## 🏗️ System Architecture

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Shadcn
- Protected routes
- Dynamic rendering

### Backend
- Node.js
- Express.js
- RESTful API structure
- Role-based authorization middleware

### Database
- PostgreSQL
- Prisma ORM
- Relational schema design

---

## 🔄 Order Status Lifecycle

PLACED → PREPARING → READY → DELIVERED
(or CANCELLED)


---

## 🚀 Future Improvements

- Online payment integration  
- Real-time order updates (WebSocket)  
- Email notifications  
- Admin analytics dashboard  
- Advanced search & filtering  
- Rating moderation system  
