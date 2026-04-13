# PrepForge

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)
![React](https://img.shields.io/badge/frontend-React%2019-blue)
![Node](https://img.shields.io/badge/backend-Node.js-green)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-purple)

**PrepForge** is an elite, AI-driven interview preparation platform designed to bridge the gap between candidates and their dream jobs. By analyzing job descriptions against user resumes and self-descriptions, PrepForge generates comprehensive interview strategies, technical/behavioral question banks, and tailored, ATS-friendly resumes.

---

## 🚀 Features

### 1. AI Interview Strategy Generation
- **Match Score**: Instant analysis of how well your profile aligns with a specific job description.
- **Technical Question Bank**: 5 targeted technical questions with underlying intentions and model answers.
- **Behavioral Preparation**: 3 behavioral questions tailored to the role's soft skill requirements.
- **Skill Gap Analysis**: Identification of missing competencies with severity ratings (Low, Medium, High).

### 2. 5-Day Preparation Roadmap
- A structured, day-by-day plan focusing on specific tasks to get you interview-ready in under a week.

### 3. AI-Tailored Resume PDF
- Generates a professional, ATS-friendly resume in PDF format.
- Dynamically adjusts content to highlight strengths relevant to the specific job description.

### 4. Secure User Dashboard
- Full authentication system (JWT & Cookies).
- History of all generated interview reports for continuous learning and review.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Routing**: React Router 7
- **State Management**: Context API (Auth & Interview)
- **Styling**: SCSS / SASS
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash)
- **PDF Engine**: Puppeteer
- **Validation**: Zod
- **File Handling**: Multer (Resume uploads)

---

## 📂 Architecture

```text
├── Backend/
│   ├── src/
│   │   ├── config/         # Database & Environment config
│   │   ├── controllers/    # Request handling logic
│   │   ├── middlewares/    # Auth, File Upload, Error handling
│   │   ├── models/         # Mongoose Schemas (User, InterviewReport)
│   │   ├── routes/         # API Endpoints
│   │   └── services/       # AI Logic & PDF Generation
│   └── server.js           # Entry point
└── Frontend/
    ├── src/
    │   ├── features/       # Modular feature folders (Auth, Interview)
    │   ├── hooks/          # Custom React hooks
    │   ├── services/       # API service layers
    │   └── style/          # Global and component-specific SCSS
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shukla-vivek008/PrepForge.git
   cd PrepForge
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

1. **Start Backend** (from `Backend` folder):
   ```bash
   npm run dev
   ```

2. **Start Frontend** (from `Frontend` folder):
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

## 🔌 API Documentation

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Authenticate user & set cookie |

### Interview Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/interview/` | Generate report (Requires Resume, JD, and Self-Desc) |
| GET | `/api/interview/` | Fetch all reports for the logged-in user |
| GET | `/api/interview/report/:id` | Fetch specific report details |
| POST | `/api/interview/resume/pdf/:id` | Generate and download tailored resume PDF |

---

## 💡 Usage Example

1. **Login/Register**: Create an account to save your progress.
2. **Input Data**: 
   - Paste the **Job Description** of your target role.
   - Upload your **Resume** (PDF) or provide a **Self-Description**.
3. **Analyze**: Click "Generate My Interview Strategy".
4. **Review**: 
   - Study the **Technical/Behavioral** questions.
   - Follow the **5-Day Roadmap**.
   - Check the **Match Score** to see where you stand.
5. **Optimize**: Download the AI-generated resume specifically tailored for that JD.

---

## 🛠 Development Guidelines

### Code Style
- **Backend**: CommonJS modules, Zod for schema validation, and service-based architecture.
- **Frontend**: Functional components with Hooks, SCSS modules for styling, and feature-based folder structure.

### Running Tests
```bash
# Backend
cd Backend && npm test
```

---

## 🗺 Roadmap
- [ ] Integration with LinkedIn for automatic JD fetching.
- [ ] Mock Interview voice-to-text simulation.
- [ ] Multi-language support for international job markets.
- [ ] Dark mode UI implementation.

---

## 📄 License
This project is licensed under the **ISC License**.

---

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Developed by [Vivek Shukla](https://github.com/shukla-vivek008)**