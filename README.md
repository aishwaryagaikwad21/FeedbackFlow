
# FeedbackFlow

A full-stack feedback management system that allows users to submit, view, and manage feedback while providing administrators with an authenticated dashboard to monitor feedback statistics and analyze customer experiences.

## Live Demo

- **Frontend:** https://courageous-jelly-996b0d.netlify.app/
- **Backend API:** https://feedbackflow-1.onrender.com
- **GitHub Repository:** https://github.com/aishwaryagaikwad21/FeedbackFlow

---

## Features

### Public Features

- Submit feedback without creating an account.
- Provide ratings and written feedback.
- Choose from multiple feedback categories.
- View submitted feedback.
- Edit and delete previously submitted feedback using a secure token-based authorization mechanism.

### Admin Features

- Admin registration and login.
- JWT-based authentication.
- Secure password hashing using Argon2.
- Token-based session management.
- Database-backed logout and token revocation.
- Protected admin routes.
- Admin dashboard with statistical insights.
- Delete feedback entries.

### Dashboard Analytics

The admin dashboard provides insights into feedback activity through:

- Total feedback submissions.
- Average feedback rating.
- Number of five-star ratings.
- Feedback category statistics.
- Monthly feedback submissions.
- Rating distribution.
- Highest-rated category.
- Lowest-rated category.
- Latest feedback submissions.

---

## Tech Stack

### Frontend
- React
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Argon2
- Zod

### Tools & Deployment
- Git & GitHub
- Postman
- MongoDB Atlas
- MongoDB Compass
- Netlify (Frontend)
- Render (Backend)

---

## Application Architecture

FeedbackFlow follows a client-server architecture.

```text
                 PUBLIC USERS
                      |
                      |
                React Frontend
                      |
                 Axios Requests
                      |
                      |
                Express Backend
                      |
          -------------------------
          |                       |
     Feedback Routes         Admin Routes
          |                       |
     Feedback CRUD          Authentication
          |                 & Dashboard
          |                       |
          -----------   -----------
                      |
                 Mongoose ODM
                      |
                 MongoDB Atlas
```

---

## Authentication & Authorization

FeedbackFlow implements JWT-based authentication for administrators.

### Admin Authentication Flow

1. An administrator registers or logs in using their credentials.
2. The backend validates the submitted data.
3. Passwords are hashed using Argon2.
4. A JWT is generated after successful authentication.
5. The token is stored in the administrator's MongoDB document.
6. The frontend stores the token in sessionStorage.
7. Axios automatically attaches the token to authenticated API requests.
8. Backend authentication middleware verifies the JWT and checks whether the token exists in the database.

### Logout Flow

1. The frontend sends a logout request with the JWT.
2. The backend authenticates the request.
3. The corresponding token is removed from the administrator's MongoDB document.
4. The frontend removes the token from sessionStorage.
5. The administrator is redirected to the login page.

This approach supports server-side token revocation.

### Public Feedback Authorization

Feedback editing and deletion are protected using a token-based authorization mechanism.

- A unique edit token is generated when feedback is submitted.
- The token is hashed before being stored in MongoDB.
- The original token is returned to the client.
- The client stores the token locally.
- Subsequent edit and delete requests include the token in the `X-Feedback-Token` header.
- The backend verifies the token hash before allowing modifications.

---

## Database Design

The application uses MongoDB with Mongoose for data modelling and database operations.

### Admin Collection

Stores administrator information, authentication details, account status, and active tokens.

Key fields:

- name
- email
- password
- role
- isActive
- lastLogin
- tokens

### Feedback Collection

Stores feedback submissions and their associated information.

Key fields include:

- Name
- Email
- Category
- Feedback content
- Rating
- Edit token hash
- Timestamps

---

## Dashboard Analytics

Dashboard statistics are generated using MongoDB Aggregation Pipelines.

The aggregation pipeline is used to calculate:

- Total feedback count.
- Average rating.
- Five-star rating count.
- Category-wise feedback statistics.
- Monthly feedback submissions.
- Rating distribution.
- Highest and lowest-rated categories.
- Latest feedback entries.

Using MongoDB aggregation allows the backend to perform data analysis directly at the database level.

---

## Project Structure

```text
FeedbackFlow/
│
├── client/
│   ├── public/
│   │   └── _redirects
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── .env
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Installation & Setup

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account or local MongoDB installation
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/aishwaryagaikwad21/FeedbackFlow.git

cd FeedbackFlow
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

### 3. Frontend Setup

Open another terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The application should now be accessible at:

```text
http://localhost:5173
```

---

## API Overview

Base URL:

```text
http://localhost:5000
```

### Admin Routes

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/admin/auth/register` | Register admin | No |
| POST | `/admin/auth/login` | Admin login | No |
| POST | `/admin/auth/logout` | Admin logout | Yes |
| GET | `/admin/auth/statistics` | Fetch dashboard statistics | Yes |
| DELETE | `/admin/auth/delete/:id` | Delete feedback as admin | Yes |

### Feedback Routes

Feedback-related endpoints are mounted under:

```text
/feedbackFlow
```

Refer to the feedback router for the complete list of endpoints.

---

## Deployment

The application is deployed using separate frontend and backend hosting services.

| Component | Platform |
|---|---|
| Frontend | Netlify |
| Backend | Render |
| Database | MongoDB Atlas |

The frontend communicates with the deployed backend through Axios using the configured API base URL.

Netlify SPA redirects are configured to support direct navigation and page refreshes on React Router routes.

---

## Key Learnings

Building FeedbackFlow helped me gain practical experience with:

- Developing and deploying a full-stack MERN application.
- Designing RESTful APIs.
- Implementing JWT authentication and authorization.
- Password hashing and secure credential handling.
- Implementing token-based authorization for public feedback modifications.
- Designing MongoDB schemas and relationships.
- Using MongoDB aggregation pipelines for dashboard analytics.
- Validating API inputs using Zod.
- Handling frontend and backend integration.
- Configuring CORS for production environments.
- Deploying applications using Netlify, Render, and MongoDB Atlas.
- Debugging production deployment issues.

---

## Future Improvements

- Pagination and filtering for feedback.
- Advanced dashboard analytics.
- Export feedback reports.
- Email notifications.
- Role-based access control for multiple administrator roles.
- Improved dashboard visualizations.

---

## Author

**Aishwarya Gaikwad**

- GitHub: https://github.com/aishwaryagaikwad21

---

*FeedbackFlow is a portfolio project built to demonstrate full-stack development, backend engineering, authentication, database management, and production deployment.*
