# FeedbackFlow - API Documentation
## Base URL

http://localhost:5000/feedbackFlow

## 1. Admin Authentication
| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | /admin/auth/register | Register admin | No |
| POST | /admin/auth/login | Admin Login | No |

## 2. Feedback Management
| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | /feedbackFlow/write | Submit feedback | No |
| GET | /feedbackFlow/allFeedbacks | Retrieve all public feedbacks | No |
| GET | /feedbackFlow/feedback/:category | Get feedback based on category | No |
| GET | /feedbackFlow/email/:emailId | Fetch feedbacks by entering email | No |
| DELETE | /feedbackFlow/delete/:feedbackId | Delete feedback | Edit Token required |
| PATCH | /feedbackFlow/update/:feedbackId | Update feedback | Edit Token required |

## 3. Admin Routes
| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | /admin/auth/statistics | retrieves aggregated statistics | Admin JWT |
| DELETE | /admin/auth/delete/:feedbackId | Delete feedback feedback | Admin JWT |




