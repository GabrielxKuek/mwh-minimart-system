# 🌟 MWH Empower 

<img src="https://github.com/GabrielxKuek/mwh-minimart-system/blob/main/images/cover.png" alt="MWH Empower Logo">

---

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

## 📖 Table of Contents
- [🌟 Key Features for Residents](#-key-features-for-residents)
- [🔧 Comprehensive Admin Functionality](#-comprehensive-admin-functionality)
- [⭐ Key Features](#-key-features)
  - [For Users](#for-users)
  - [For Admins](#for-admins)
- [🎮 App Preview](#-app-preview)
- [🔧 Technical Highlights](#-technical-highlights)
- [📱 User Features](#-user-features)
- [👩‍💼 Admin Features](#-user-features)
- [🚀 Getting Started](#-getting-started)
- [🛠️ Technology Stack](#️-technology-stack)
- [👥 Team](#-team)

---

MWH Empower is an innovative mobile application designed to support youth rehabilitation and reintegration into society. Through a gamified task-reward system, users can earn points by completing various tasks and redeem them for rewards, fostering positive behavior and life skills development.

## 🌟 Key Features for Residents
- **📝 Task Booking for Rewards**: Residents can browse and book various community or self-improvement tasks, earning voucher points upon completion.
- **🎁 Rewards Redemption**: Accumulated voucher points can be redeemed for exciting prizes and necessities at a dedicated in-app minimart.
- **🏆 Gamification Elements**:
  - **📊 Leaderboards**: Encourage friendly competition by showcasing top-performing participants.
  - **🏅 Achievements**: Unlockable badges motivate users by recognizing their milestones and consistent efforts.

## 🔧 Comprehensive Admin Functionality
- **🗂 Tasks**: Create, assign, and monitor tasks to ensure alignment with program goals.
- **📦 Inventory**: Maintain up-to-date records of minimart items, ensuring prize availability.
- **👥 Users**: Monitor user activity, progress, and performance.
- **💸 Transactions**: Track point allocations and redemptions with full transparency.
- **🛍 Minimart**: Manage prize listings, stock levels, and voucher point requirements.
- **📊 Dashboard**: Gain actionable insights through an intuitive and easy-to-use dashboard for overseeing overall program performance.

## ⭐ Key Features

### For Users
- **Task Management**: Browse and book available tasks
- **Task Completion System**: Submit photo evidence of completed tasks
- **Reward System**: Earn points and redeem vouchers
- **Gamification Elements**: 
  - Achievement system
  - Leaderboard rankings
  - Progress tracking
- **Minimart Integration**: Browse and redeem rewards using earned points

### For Admins
- **Comprehensive Dashboard**: Monitor user activity and system metrics
- **Task Management**: Create, edit, and manage available tasks
- **User Management**: Track user progress and manage accounts
- **Inventory Control**: Manage minimart items and vouchers
- **Transaction History**: Track all point transactions and redemptions

## 🎮 App Preview

| Feature | Description | Demo |
| ------- | ----------- | ---- |
| Tasks Feature | Allows the residents to book tasks to complete for rewards such as voucher points! | ![image](https://github.com/user-attachments/assets/ac67ad11-79b3-4024-9573-f900d62731f4) |
| Minimart Feature | Residents can use their voucher points to redeem prizes in the minimart! | ![image](https://github.com/user-attachments/assets/6ce09306-961e-434f-825d-6907a41474cc)|
| Voucher Dashboard | Used by the residents to track their claimed and unclaimed vouchers | ![image](https://github.com/user-attachments/assets/fdeea93f-bed9-4255-a549-0aec401eeda5)|
| Achievements | A gamification feature to give a sense of accomplishment to residents |![image](https://github.com/user-attachments/assets/147b7ab7-5da5-4b87-b231-bb1ffe7b8bf6)
| Leaderboard | Another gamification feature to motivate residents | ![image](https://github.com/user-attachments/assets/4b4fb428-0ec5-40a5-b9e4-2bbaf5e8d2c1)|
| Admin Dashboard | An elegant dashboard for easy data visualization for the admin| ![image](https://github.com/user-attachments/assets/54658864-06ca-4c97-a817-555207ce47ad)|
| User Management | A Full suite of tools for creating, managing and updating users. |![image](https://github.com/user-attachments/assets/c93a339c-a804-462d-8efd-4c609ec627d8)|
| Task Management | Full suite of tools for creating, editing, and managing tasks.  | ![image](https://github.com/user-attachments/assets/ac0fa376-d8d8-4c3d-b873-8b4588c3ea13)|
| Transaction Management | Centralized system for tracking all voucher transactions, point allocations, and prize redemptions. Includes detailed transaction history, filtering options, and audit trails. | ![image](https://github.com/user-attachments/assets/b03170f0-3e36-438e-bb72-46fd94ce996d)|

## 🔧 Technical Highlights

This project implements numerous advanced web development concepts:

- **MVC Architecture**: Clean separation of concerns
- **Firebase Integration**:
  - Firestore for real-time data management
  - Storage for task completion photos
  - Authentication for secure user management
- **Express Backend**: 
  - RESTful API design
  - Middleware implementation
  - Error handling
- **React Frontend**:
  - Component-based architecture
  - State management
  - Responsive design
- **Security Features**:
  - Role-based access control
  - Input validation
  - Secure file handling

## 📱 User Features

- Browse available tasks
- Book and complete tasks
- Submit completion evidence
- Track progress and achievements
- View leaderboard rankings
- Redeem rewards in minimart
- View transaction history

## 👩‍💼 Admin Features

- Monitor system metrics
- Manage tasks and rewards
- Review task completions
- Handle user management
- Control inventory
- Process redemptions
- Generate reports

## 🚀 Getting Started

1. **Install the Latest Node.js Version**:
   - Visit the [Node.js Downloads page](https://nodejs.org/) and download the latest **LTS** version for your operating system.  
   - Alternatively, install it using a package manager:  
   - **Windows**: Use [nvm-windows](https://github.com/coreybutler/nvm-windows):
       ```bash
       nvm install lts
       nvm use lts
       ```
   - **macOS/Linux**: Use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm):
       ```bash
       curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
       nvm install --lts
       nvm use --lts
       ```
   - Verify installation:
       ```bash
       node -v
       npm -v
       ```

2. **Clone this repository**:
   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name

3. **Terminal 1: Setup for the Client**:
  - Navigate to the client directory:
     ```bash
     cd client/mwh-minimart-system
     ```
  - Install latest node version with Long-Term Support:
     ```bash
     nvm install --lts
     ```
  - Install client dependencies:
     ```bash
     npm install
     ```
  - Create .env file at server folder:
     ```bash
     touch .env
     ```
  - Key in values inside the .env file:
    ```
      API_KEY=
      AUTH_DOMAIN=
      PROJECT_ID=
      STORAGE_BUCKET=
      MESSAGING_SENDER_ID=
      APP_ID=
      MEASUREMENT_ID=
    ```
  - Start the client development server:
     ```bash
     npm run dev
     ```

4. **Terminal 2: Setup for the Server**:
  - Navigate to the server directory:
     ```bash
     cd server
     ```
  - Install server dependencies:
     ```bash
     npm install
     ```
  - Create .env file at server folder:
     ```bash
     touch .env
     ```
  - Key in values inside the .env file:
    ```
      API_KEY=
      AUTH_DOMAIN=
      PROJECT_ID=
      STORAGE_BUCKET=
      MESSAGING_SENDER_ID=
      APP_ID=
      MEASUREMENT_ID=
    ```
  - Start the server development server:
     ```bash
     npm run dev
     ```

## 🛠️ Technology Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth

## 👥 Team
<table>
<tr>
<td align="center">
<a href="https://github.com/GabrielxKuek">
<img src="https://avatars.githubusercontent.com/u/139882011?v=4" width="100px;" alt="Gabriel, All-seeing"/><br>
<sub>
<b>Gabriel Kuek</b>
</sub>
</a>
</td>
<td align="center">
<a href="https://github.com/xR4F4ELx">
<img src="https://avatars.githubusercontent.com/u/101986187?v=4" width="100px;" alt="Rafael Profile Picture"/><br>
<sub>
<b>Rafael Macam</b>
</sub>
</a>
</td>
<td align="center">
<a href="https://github.com/codebreaker64">
<img src="https://avatars.githubusercontent.com/u/64005011?v=4" width="100px;" alt="Kai Jie Picture"/><br>
<sub>
<b>Fong Kai Jie</b>
</sub>
</a>
</td>
<td align="center">
<a href="https://github.com/calvinseptyanto">
<img src="https://avatars.githubusercontent.com/u/98633109?v=4" width="100px;" alt="Calvin Profile Picture"/><br>
<sub>
<b>Calvin Septyanto</b>
</sub>
</a>
</td>
</tr>
</table>

Made by Hack Tuah Script on That Thang
