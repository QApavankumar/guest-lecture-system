# Guest Lecture Management System - Backend Architecture (MERN)

This directory is reserved for the Express.js and MongoDB backend to scale the application into a full MERN stack.

## Planned Architecture

```
server/
├── config/
│   └── db.js                 # MongoDB connection using Mongoose
├── models/
│   ├── Request.js            # Guest Lecture requisition schema
│   └── User.js               # Admin & Vocational Trainer user schema
├── routes/
│   ├── requestRoutes.js      # CRUD endpoints for requisitions
│   └── authRoutes.js         # JWT-based admin authentication
├── controllers/
│   ├── requestController.js  # Business logic & validations
│   └── authController.js     # Admin login & session verification
├── middleware/
│   └── authMiddleware.js     # JWT token verification guard
├── server.js                 # Express app entry point
└── package.json
```

## Schema Preview: `Request.js`

```javascript
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  reqId: { type: String, required: true, unique: true },
  district: { type: String, required: true },
  mandal: { type: String, required: true },
  village: { type: String, required: true },
  schoolName: { type: String, required: true },
  udiseCode: { type: String, required: true },
  trade: { type: String, required: true },
  tradeCode: { type: String },
  vtName: { type: String, required: true },
  vtMobile: { type: String, required: true },
  lectureDate: { type: String, required: true },
  topic: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
    default: 'Pending'
  },
  assignedSpeaker: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
```

The frontend in `client/src/services/api.js` is already structured to map directly to these REST endpoints (`/api/requests`, `/api/auth/login`).

