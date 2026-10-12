# Telangana Government - Samagra Shiksha
## Guest Lecture Management System (Frontend MERN Starter)

A modern, institutional web portal designed for the **Department of School Education, Government of Telangana (Samagra Shiksha - Vocational Education Wing)**.

This system allows **Vocational Trainers (VTs)** across all 33 Telangana districts to submit requisitions for industry expert guest lectures, send direct WhatsApp notifications/queries to the State Admin, and provides a dedicated **State Admin Portal** for review and scheduling.

---

## 🚀 Key Features

1. **Vocational Trainer (VT) Portal**:
   - Vocational Trade selector (IT/ITeS, Healthcare, Retail, Beauty & Wellness, Automobile, Agriculture, etc. - NSQF aligned).
   - Trainer Name & 10-digit mobile number validation.
   - **"Ask Admin (WhatsApp)"** feature: Sends immediate WhatsApp message/notification to State Admin with prefilled trainer details and query.
   - **"Click here for Guest Lecture"**: Triggers requisition workflow.

2. **Cascading School & Location Selector Modal**:
   - **Select Dist**: Telangana Districts (Hyderabad, Medchal-Malkajgiri, Rangareddy, Warangal, Karimnagar, Nizamabad, Khammam, Nalgonda, Sangareddy, Mahabubnagar, etc.).
   - **Select Mandal**: Cascading selector based on selected district.
   - **Select Villages**: Cascading selector based on selected mandal.
   - **UDISE School**: School list with 11-digit official UDISE codes.
   - **Date of Guest Lecture**: Modern calendar picker with validation.
   - **Submit for Request**: Saves request and triggers confetti feedback.

3. **State Admin Portal**:
   - Accessible via **"Admin Login"** button on the top right.
   - **Credentials**:
     - **Username**: `admin`
     - **Password**: `admin123`
   - Real-time KPI summary (Total Requests, Pending Review, Approved, Completed).
   - Search by UDISE, school, or trainer name.
   - Filter by District and Status.
   - Quick **Approve** and **Reject** controls.
   - Requisition detail inspector and official print sheet generator.

4. **Persistence & Future MERN Integration**:
   - Frontend state persists in `localStorage` so new requests submitted in the trainer form immediately show up in the Admin Dashboard!
   - Structured with `services/api.js` for instant connection to Express.js and MongoDB.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Running the Frontend
```powershell
cd client
npm install
npm run dev
```

The portal will be available at `http://localhost:5173`.

