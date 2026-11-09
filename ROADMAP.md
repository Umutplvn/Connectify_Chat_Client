# Connectify Real-Time Messaging Client (`Connectify_Chat_Client`) — Engineering Roadmap (25+ Hours Planned Work)

This document outlines the planned engineering backlog and upcoming feature development for **Connectify_Chat_Client**.

## 1. WebSocket Reconnection Resilience & Offline Message Queue (~6 hours)
- [ ] Extract Socket.io client connection management into a dedicated middleware/hook with exponential backoff reconnection and connection-state indicators.
- [ ] Queue outgoing messages locally when offline and flush automatically upon socket reconnection.

## 2. Thread Replies, Message Search & Rich Media Previews (~7 hours)
- [ ] Add full-text client-side and server-backed message search with date/sender filters in `Messages.jsx`.
- [ ] Support threaded message replies, code-block syntax highlighting, and lightbox previews for shared images/documents.
- [ ] Fix typo in component filename (`DeleteAcoountModal.jsx` -> `DeleteAccountModal.jsx`) and standardize modal state management.

## 3. Security & State Management Refactoring (~6 hours)
- [ ] Remove unused server-only packages (`nodemailer`, `@react-native-firebase/auth`) from frontend `package.json` to reduce bundle size.
- [ ] Ensure sensitive fields (such as `password` or `passcode` in `authSlice.jsx`) are never stored in `redux-persist` `localStorage`.

## 4. Automated Test Suite & Vite + TypeScript Migration (~6 hours)
- [ ] Expand unit and component tests covering `authSlice`, `appDataSlice`, `formatDateTime`, and chat view rendering.
- [ ] Migrate project bundler from `react-scripts` to **Vite + TypeScript**.
