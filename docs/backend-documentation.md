# FeedbackFlow - Backend Documentation

## 1. Project Overview

FeedbackFlow is a feedback management system that allows users to submit feedback about different products, services and experiences.

The application provides an administrative interface where administrators can authenticate themselves, manage feedback entries and monitor feedback statistics through an analytics dashboard.

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| Zod | Request data validation |
| JSON Web Token (JWT) | Administrator authentication |
| Argon2 | Password hashing |
| Git | Version control |

## 3. Backend Architecture

The backend follows the MVC (Model-View-Controller) architectural pattern.

### 3.1 Models

Models define the structure of documents stored in MongoDB.

- Feedback Model: Stores customer feedback information.
- Admin Model: Stores administrator account information.

### 3.2 Controllers

Controllers contain the business logic and handle incoming API requests.

**Admin Controller**

- Register administrators.
- Authenticate administrators.
- Generate authentication tokens.
- Retrieve administrator dashboard statistics.

**Feedback Controller**

- Submit new feedback.
- Retrieve feedback entries.
- Update existing feedback.
- Delete existing feedback.

### 3.3 Routes

Routes define the API endpoints and connect incoming requests to their respective controller functions.

- Admin authentication routes.
- Admin statistics routes.
- Public feedback routes.

### 3.4 Middleware

Middleware functions process incoming requests before they reach the controller.

- Authentication middleware: Verifies administrator JWT tokens.
- Validation middleware: Validates incoming request data.
- Error handling: Handles errors and sends appropriate responses.

## 4. Authentication and Authorization

FeedbackFlow uses JWT-based authentication for administrator accounts.

### Authentication Workflow

1. Administrator submits login credentials.
2. Backend retrieves the administrator account.
3. Submitted password is compared with the stored password hash.
4. If credentials are valid, a JWT is generated.
5. The client receives the authentication token.
6. The token is included in subsequent protected API requests.
7. Authentication middleware verifies the token before allowing access.

### Authorization

- Public users can submit feedback without creating an account.
- Administrator routes are protected through JWT authentication.
- Only authenticated administrators can access dashboard statistics and protected management operations.

## 5. Feedback Security Mechanism

FeedbackFlow implements a token-based authorization mechanism for editing and deleting feedback without requiring user accounts.

### Token Generation

1. A random edit token is generated when feedback is submitted.
2. The original token is returned to the client.
3. The SHA-256 hash of the token is stored in MongoDB.
4. The client stores the token locally, associated with the corresponding feedback ID.

### Token Verification

1. The client sends the feedback ID and edit token with an update or delete request.
2. The token is passed through the `X-Feedback-Token` request header.
3. Backend hashes the received token using SHA-256.
4. The generated hash is compared with the stored hash.
5. The requested operation is authorized only when the hashes match.

## 6. Data Validation

Zod is used to validate incoming request data before processing it.

Validation is implemented for:

- Administrator registration.
- Administrator login.
- Feedback submission.
- Feedback updates.

Validation checks include:

- Required fields.
- Valid email addresses.
- Permitted feedback categories.
- Valid rating values.
- Password complexity requirements.

## 7. Feedback Management

The feedback management functionality supports the following operations:

| Operation | Description |
|---|---|
| Create | Submit new feedback |
| Read | Retrieve feedback entries |
| Update | Modify existing feedback using an edit token |
| Delete | Remove existing feedback using an edit token |

Public users do not need an account to submit feedback.

## 8. Admin Dashboard Analytics

MongoDB aggregation pipelines are used to generate analytical statistics for the administrator dashboard.

The statistics include:

1. Total feedback submissions.
2. Overall average rating.
3. Category-wise feedback count.
4. Category-wise average rating.
5. Total five-star ratings.
6. Rating distribution.
7. Month-wise feedback submissions.
8. Latest five feedback entries.
9. Highest-rated category.
10. Lowest-rated category.

### MongoDB Aggregation Operators Used

| Operator | Purpose |
|---|---|
| `$match` | Filter documents |
| `$group` | Group documents |
| `$sum` | Calculate totals and counts |
| `$avg` | Calculate average ratings |
| `$sort` | Sort aggregation results |
| `$limit` | Restrict the number of results |
| `$project` | Select specific fields |
| `$count` | Count matching documents |
| `$dateToString` | Format dates for monthly grouping |

## 9. Error Handling

The backend uses try-catch blocks to handle errors during database operations and request processing.

API responses include:

- Success status.
- Appropriate HTTP status codes.
- Descriptive error messages.

## 10. Security Practices

The following security mechanisms are implemented:

1. Password hashing before storing administrator credentials.
2. JWT-based administrator authentication.
3. Protected routes using authentication middleware.
4. SHA-256 hashing of feedback edit tokens.
5. Request validation using Zod.
6. Environment variables for sensitive configuration.

## 11. Future Improvements

Potential improvements include:

- Pagination for feedback retrieval.
- Advanced feedback filtering and searching.
- Rate limiting.
- Automated testing.
- API documentation using Swagger.
- More detailed analytics and reporting.