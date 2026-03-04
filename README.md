# THIS REPO CONTAINS MALICIOS CODE it is here for investigation purposes only. 
# DO NOT  DOWNLOAD OR RUN THIS CODE
# DO NOT  DOWNLOAD OR RUN THIS CODE

# RealFraction 🏠

**RealFraction** is a modern, responsive real estate platform designed to streamline the digital housing marketplace. Built with a premium aesthetic and a robust full-stack architecture, it allows users to discover, list, and transact properties with ease and security.

---

## 🌟 Key Features

- **Premium Discovery**: A high-end property browser with immersive animations (Framer Motion).
- **Secure Transactions**: Integrated payment gateways for secure bookings.
- **Robust Auth**: JWT-based authentication with role-based access control.
- **Dynamic Analytics**: (Optional/Planned) Performance tracking for property owners.
- **Responsive Design**: Flawless experience across Mobile, Tablet, and Desktop.

---

## 🛠 Tech Stack

- **Frontend**: React.js, Bootstrap 5, Swiper, Framer Motion.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose) & SQLite.
- **Smart Contract**: Solidity.
- **Icons/Fonts**: Font Awesome 6.

---

## 📂 Project Structure

The project follows a clean separation of concerns between the client and the server:

```bash
RealFraction/
├── public/                 # Static assets for the React frontend
├── contracts/              # Smart Contract
├── server/                 # Express Backend
│   ├── config/             # Environment & DB configurations
│   ├── controllers/        # Business logic & Request handlers
│   ├── models/             # Database schemas (Mongoose)
│   ├── routes/             # API Endpoint definitions
│   ├── middlewares/        # Auth, Validation, & Error handling
│   ├── utils/              # Helper functions & utility classes
│   └── server.js           # Server entry point
├── src/                    # React Frontend
│   ├── components/         # Reusable UI components
│   ├── images/             # UI images & assets
│   ├── pages/              # Main page views (Header, Properties, etc.)
│   ├── App.js              # Root React component
│   └── index.js            # Frontend entry point
├── package.json            # Project dependencies & scripts
└── .gitignore              # Git ignore rules
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v20+)
- Local MongoDB instance or Atlas URI.

### 2. Installation
Install dependencies in the root directory:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the `server/config` directory (or based on `.config.env`) with your credentials:
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `STRIPE_API_KEY`

### 4. Launch
Start both the server and the frontend concurrently:
```bash
npm start
```

---

## ⚖️ License
This project is licensed under the MIT License.


