# Connectify Real-Time Messaging & Social Client (`Connectify_Chat_Client`)

**Live Demo:** [https://connectify-chat.netlify.app/](https://connectify-chat.netlify.app/)

A real-time web messaging, contact management, ephemeral status/stories, and personal notes application built with **React 18, Redux Toolkit (`redux-persist`), Socket.io Client, Material UI (`@mui/material`), React Hook Form, and React Router v6**.

## Who It's For
- Teams and communities looking for a responsive web messaging client supporting real-time 1-on-1 chat, message reactions, starred/favorite messages, ephemeral status updates, and personal notes.

## Tech Stack
- **Frontend Framework:** React 18 (`react`, `react-dom`, `react-router-dom` v6)
- **Real-Time Communication:** Socket.io Client (`socket.io-client`)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`, `redux-persist`)
- **UI & Components:** Material UI (`@mui/material`, `@mui/icons-material`), `emoji-picker-react`, `react-input-emoji`, `react-chat-elements`
- **Forms & Validation:** `react-hook-form`, `react-password-strength-bar`
- **HTTP Client & Notifications:** Axios (`axios`), `react-hot-toast`, `react-toastify`

## Getting Started

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm or yarn

### Installation & Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/Umutplvn/Connectify_Chat_Client.git
   cd Connectify_Chat_Client
   ```
2. Copy the environment variable template:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Running Tests & Production Build
```bash
CI=true npm test -- --watchAll=false
npm run build
```

## Planned Work & Roadmap
See [ROADMAP.md](./ROADMAP.md) for the full 25+ hour development roadmap.

## License
Distributed under the **MIT License**. See [LICENSE](./LICENSE) for details.
