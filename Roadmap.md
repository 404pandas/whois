Phase 1: Foundation & Project Setup

[ ] Set up GitHub repo, README, branches

[ ] Initialize backend (Node.js + Express + Apollo Server + MongoDB + Mongoose)

[ ] Initialize frontend (React Native + Apollo Client + MUI for web dashboard)

[ ] Set up JWT authentication (signup, login, logout, auth middleware)

[ ] Set up MongoDB models for:

User

Question

GameSession (or MatchSession)

Answer


[ ] Set up GraphQL schema and resolvers for all models

[ ] Connect frontend and backend using Apollo Client



---

Phase 2: Auth & User Flow

[ ] Implement user sign up / login with JWT

[ ] Create protected routes for authenticated users

[ ] Build basic dashboard layout

[ ] Add profile page with editable user info

[ ] Create admin review flow for user-submitted questions (optional early)



---

Phase 3: Socket.IO Integration

[ ] Integrate Socket.IO on backend and frontend

[ ] Create “waiting room” and matchmaking logic

[ ] Build UI for connecting with another player

[ ] Handle session joining, disconnects, rejoin



---

Phase 4: Game Logic

[ ] Build Question carousel interface

[ ] Show same question to both users in sync

[ ] Store responses in GameSession collection

[ ] Timeouts or delays between questions

[ ] Show progress UI



---

Phase 5: Stats and Results

[ ] Aggregate answers to create personality/trait scores

[ ] Compare partner stats in a fun/friendly way

[ ] Display visual breakdown (charts, graphs, emojis, etc.)



---

Phase 6: Custom Questions

[ ] Allow users to submit questions

[ ] Store as pending in DB

[ ] Add admin review dashboard for approvals

[ ] Optional: upvote/downvote system for existing questions



---

Phase 7: UI Polish and Testing

[ ] Finalize styling across mobile screens (React Native) and web dashboard (MUI)

[ ] Add animation for transitions and results

[ ] Conduct end-to-end testing with multiple users

[ ] Handle error states, connection drops, etc.



---

Phase 8: Deployment

[ ] Set up backend deployment (Render, Railway, or Heroku)

[ ] Deploy MongoDB Atlas or another DB

[ ] Deploy React Native with Expo or EAS (App Store / Google Play)

[ ] CI/CD if possible
