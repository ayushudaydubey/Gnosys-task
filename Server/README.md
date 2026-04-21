# Smart Candidate Evaluation System - Backend

## Overview

This backend application manages the complete hiring workflow, from candidate creation to final evaluation. It is built using Node.js, Express, and MongoDB, following a RESTful API architecture.

The system supports candidate management, resume upload, screening, multi-round evaluation, and automated final scoring.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB with Mongoose
* Multer (file handling)
* ImageKit (file storage)
* Express Validator (validation)

---

## Features

### Candidate Management

* Add candidate with resume upload
* Prevent duplicate candidates based on email
* Fetch all candidates
* Fetch candidate details

### Screening System

* Default screening status set to "Pending"
* Update screening status to Shortlisted or Rejected
* Add remarks

### Multi-Round Evaluation

* HR Round (feedback + rating)
* Technical Round (feedback + rating)
* Task Round (feedback + rating + optional AI score)

### Final Evaluation

* Automatic score calculation (average of rounds)
* Final status assignment (Selected or Rejected)

### Dashboard

* Displays candidate summary including:

  * Name
  * Stage
  * Score
  * Final status

---

## API Endpoints

### Candidate APIs

* POST /api/candidates
* GET /api/candidates
* GET /api/candidates/:id

### Screening API

* PUT /api/screening/:candidateId

### Round API

* POST /api/rounds

### Dashboard API

* GET /api/dashboard

---

## Project Structure

```
server/
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── uploads/
├── app.js
├── server.js
```

---

## Installation

1. Clone the repository
2. Navigate to backend folder

```
cd server
npm install
```

3. Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
PORT=5000
```

4. Start the server

```
npm run dev
```

---

## Data Flow

1. Candidate is created
2. Resume is uploaded to ImageKit
3. Screening record is created with default status "Pending"
4. Screening status is updated manually
5. Rounds are added (HR, Technical, Task)
6. Final score is calculated automatically
7. Dashboard aggregates all data

---

## Validation and Error Handling

* Duplicate email validation before creation
* MongoDB unique constraint for email
* Structured error responses
* Input validation using middleware

---

## Key Design Decisions

* Separate collections for candidates, screening, rounds, and evaluation
* Service layer used for score calculation
* File storage handled externally via ImageKit
* API-first architecture for frontend integration

---

## Future Improvements

* Authentication and role-based access
* Pagination and filtering
* Advanced analytics dashboard
* Real AI integration for task evaluation

---

## Author

Smart Candidate Evaluation System Backend
