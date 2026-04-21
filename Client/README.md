# Smart Candidate Evaluation System - Frontend

## Overview

This frontend application provides a user interface to manage the candidate hiring process. It is built using React and communicates with the backend through REST APIs.

The application supports candidate creation, screening management, multi-round evaluation, and dashboard visualization.

---

## Tech Stack

* React (Vite)
* Axios (API communication)
* React Router (routing)
* TanStack Query (server state management)
* React Toastify (notifications)

---

## Features

### Candidate Management

* Add candidate with resume upload
* Prevent duplicate submissions using backend validation
* View list of candidates
* View detailed candidate profile

---

### Screening Management

* Update candidate status:

  * Pending
  * Shortlisted
  * Rejected
* Add remarks for screening decisions

---

### Multi-Round Evaluation

* Submit feedback and rating for:

  * HR round
  * Technical round
  * Task round
* Task round supports optional AI score (simulated field)

---

### Final Evaluation

* Displays automatically calculated score
* Shows final selection status

---

### Dashboard

* Displays all candidates
* Shows:

  * Current stage
  * Final score
  * Final status

---

## State Management (TanStack Query)

TanStack Query is used for managing server state and API interactions.

### Benefits:

* Automatic caching of API responses
* Background data refetching
* Simplified loading and error handling
* Improved performance by reducing redundant API calls

### Usage:

* `useQuery` for fetching candidate lists and dashboard data
* `useMutation` for creating candidates and submitting rounds

---

## Project Structure

```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
```

---

## Installation

1. Navigate to frontend directory:

```
cd client
npm install
```

2. Start the development server:

```
npm run dev
```

---

## API Integration

Base URL:

```
http://localhost:3000/api
```

All API calls are managed using Axios and integrated with TanStack Query.

---

## Key Components

* CandidateForm
  Handles candidate creation and file upload

* CandidateList
  Displays all candidates

* CandidateDetail
  Shows complete candidate data including rounds and evaluation

* Dashboard
  Displays aggregated hiring data

---

## Notifications

User feedback is handled using React Toastify:

* Success messages on successful operations
* Error messages on API failures
* Warning messages where required

---

## Performance Optimization

* Lazy loading implemented using React.lazy and Suspense
* Pages are loaded only when needed
* Reduced initial bundle size

---

## Data Flow

1. User submits data via forms
2. API request is triggered using TanStack Query mutation
3. Backend processes the request
4. Query cache is updated
5. UI re-renders automatically with updated data

---

## Future Improvements

* Add pagination and search functionality
* Improve UI with a design system (e.g., Tailwind CSS)
* Add authentication and role-based access
* Real-time updates using WebSockets

---

## Author

Smart Candidate Evaluation System Frontend
