# FeedbackFlow - Database Schema Documentation

## 1. Overview

FeedbackFlow uses MongoDB as its database and Mongoose as its ODM (Object Document Mapper).

The application consists of two primary collections:

1. **Feedbacks:** Stores feedback submitted by public users.
2. **Admins:** Stores administrator account information and authentication details.

---

## 2. Feedback Collection

**Collection Name:** `feedbacks`

**Model:** `Feedback`

**Purpose:** Stores feedback submitted by users regarding different products, services and experiences.

### 2.1 Schema Fields

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto-generated | Unique feedback identifier |
| `name` | String | Yes | Name of the customer |
| `email` | String | Yes | Customer's email address |
| `category` | String | Yes | Category of feedback |
| `feedback` | String | Yes | Feedback description |
| `rating` | Number | Yes | Customer rating (1–5 stars) |
| `editTokenHash` | String | Yes | SHA-256 hash of the feedback edit token |
| `createdAt` | Date | Auto-generated | Feedback submission timestamp |
| `updatedAt` | Date | Auto-generated | Last modification timestamp |

### 2.2 Category Values

- Product
- Service
- App
- Food
- Travel
- Shopping
- Education
- Entertainment
- Other

### 2.3 Validation Rules

| Field | Validation |
|---|---|
| name | Required |
| email | Must be a valid email address |
| category | Must belong to the permitted category list |
| feedback | Required |
| rating | Must be between 1 and 5 |

### 2.4 Security Mechanism

FeedbackFlow implements a token-based mechanism to authorize feedback editing and deletion.

**Token Generation:**

1. A random edit token is generated when feedback is submitted.
2. The original token is returned to the client.
3. The SHA-256 hash of the token is stored in MongoDB.

**Token Verification:**

1. The client stores the edit token locally, associated with the feedback ID.
2. For update and delete requests, the client sends the token through the `X-Feedback-Token` request header.
3. The backend hashes the received token using SHA-256.
4. The generated hash is compared with the stored hash.
5. The operation is permitted only when the hashes match.

---

## 3. Admin Collection

**Collection Name:** `admins`

**Model:** `Admin`

**Purpose:** Stores administrator account information and authentication details.

### 3.1 Schema Fields

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto-generated | Unique administrator identifier |
| `name` | String | Yes | Administrator's name |
| `password` | String | Yes | Hashed administrator password |
| `role` | String | Yes | Administrator role |
| `tokens` | Array | Depends on implementation | Authentication tokens, if implemented |
| `isActive` | Boolean | Yes | Indicates whether the account is active |
| `lastLogin` | Date | No | Timestamp of the last successful login |
| `createdAt` | Date | Auto-generated | Account creation timestamp |
| `updatedAt` | Date | Auto-generated | Last account modification timestamp |

### 3.2 Validation Rules

| Field | Validation |
|---|---|
| name | Required |
| password | Must satisfy configured password complexity requirements |
| role | Must belong to the permitted role values |
| isActive | Boolean |
| lastLogin | Valid Date, when provided |

### 3.3 Security Mechanism

- Administrator passwords are hashed before being stored.
- JWT is used for administrator authentication.
- Protected routes require a valid authentication token.
- Authentication middleware verifies the token before granting access to protected resources.

---

## 4. Database Operations

| Collection | Operation | Purpose |
|---|---|---|
| Feedbacks | Create | Submit new feedback |
| Feedbacks | Read | Retrieve feedback entries |
| Feedbacks | Update | Edit existing feedback |
| Feedbacks | Delete | Delete existing feedback |
| Feedbacks | Aggregate | Generate dashboard statistics |
| Admins | Create | Register administrators |
| Admins | Read | Authenticate administrators |
| Admins | Update | Update administrator information |

---

## 5. Database Aggregation

MongoDB aggregation pipelines are used to generate analytical data for the administrator dashboard.

| Statistic | MongoDB Operators |
|---|---|
| Category-wise feedback count | `$group`, `$sum`, `$sort` |
| Category-wise average rating | `$group`, `$avg` |
| Overall average rating | `$group`, `$avg` |
| Five-star feedback count | `$match`, `$count` |
| Rating distribution | `$group`, `$sum`, `$sort` |
| Monthly feedback submissions | `$dateToString`, `$group`, `$sort` |
| Latest feedback entries | `$sort`, `$limit`, `$project` |
| Highest-rated category | `$match`, `$group`, `$sort` |
| Lowest-rated category | `$match`, `$group`, `$sort` |

---

## 6. Timestamps

Mongoose timestamps are used to maintain document creation and modification dates.

- `createdAt`: Records when a document was created.
- `updatedAt`: Records when a document was last modified.

These timestamps are used for monthly submission analytics and retrieving the latest feedback entries.

---

## 7. Data Security

The following security practices are implemented:

1. Administrator passwords are stored as hashes rather than plain text.
2. Feedback edit tokens are stored as SHA-256 hashes.
3. JWT authentication protects administrator routes.
4. Feedback modification and deletion require valid edit-token verification.
5. Input validation is performed before processing incoming data.
