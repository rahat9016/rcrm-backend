# 🍽️ Restaurant POS Backend

A scalable and modular **Restaurant Point of Sale (POS)** backend system built with **NestJS**. It manages users, orders, real-time kitchen updates, payments, inventory, and reporting functionalities — all secured with role-based access control.

---

## ⚙️ Technologies Used

- **NestJS**: Modular and scalable Node.js framework.
- **Prisma**: Type-safe ORM for PostgreSQL.
- **PostgreSQL**: Relational database for structured data.
- **JWT Authentication**: For secure login and role-based authorization.
- **Class-validator**: Ensures validation on Data Transfer Objects (DTOs).
- **Socket.IO**: Enables real-time communication between kitchen and waiters.

---


---

## 🧩 API Modules Overview

| Module       | Endpoints |
|--------------|-----------|
| **Auth**         | `POST /auth/login`, `POST /auth/register` |
| **Users**        | `GET /users`, `POST /users` _(Admin only)_ |
| **Orders**       | `POST /orders`, `PATCH /orders/:id`, `GET /orders/active` |
| **OrderItems**   | `POST /order-items`, `PATCH /order-items/:id/status` |
| **Kitchen**      | `GET /kitchen/orders`, `PATCH /order-items/:id/status` |
| **Payment**      | `POST /payments`, `GET /payments/order/:orderId` |
| **Menu**         | `GET /menu`, `POST /menu`, `PATCH /menu/:id` |
| **Inventory**    | `GET /inventory`, `PATCH /inventory/:id`, `POST /inventory/adjust` |
| **Reservation**  | `POST /reservations`, `GET /reservations`, `DELETE /reservations/:id` |
| **Discount**     | `POST /discounts`, `PATCH /discounts/:id/apply` |
| **Reports**      | `GET /reports/sales`, `GET /reports/inventory`, `GET /reports/payments` |

---

## 🔐 Authentication & Authorization

- **JWT Tokens** for access and refresh flows.
- **Role-based Guards** to restrict access by roles:
  - `Customer`
  - `Admin`
  - `Staff`
  - `Chef`

---

## 🔄 Real-time Updates

- **Socket.IO Integration**:
  - Live kitchen order updates.
  - Notify staff when order status changes.

---

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/restaurant-pos-backend.git
cd restaurant-pos-backend


