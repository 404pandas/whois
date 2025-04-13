# Realtime Architecture & GraphQL Schema Design

This document outlines the **Socket.IO Events**, **GraphQL Queries, Mutations**, and **Subscriptions** needed for the matchmaking Q&A app.

---

## Socket.IO Events

### Connection / Room Management

- `join_room`  
  **Payload:**  
  ```json
  { "userId": "string", "roomCode": "string" }
  ```

- `room_joined`  
  **Emitted To Room:**  
  ```json
  { "userId": "string", "username": "string" }
  ```

- `leave_room`  
  Triggered when user leaves a session.

- `room_left`  
  Notifies remaining user:
  ```json
  { "userId": "string" }
  ```

---

### Game Flow

- `start_game`  
  **Payload:**  
  ```json
  { "roomCode": "string" }
  ```

- `new_question`  
  **Emitted by Server:**  
  ```json
  { "questionText": "string", "questionId": "string" }
  ```

- `submit_answer`  
  **Payload:**  
  ```json
  { "userId": "string", "answer": "string", "questionId": "string", "roomCode": "string" }
  ```

- `receive_answer`  
  **Emitted to Room:**  
  ```json
  { "answersSoFar": [ { "userId": "string", "answer": "string" } ], "waitingOn": "userId" }
  ```

- `question_result`  
  When both users answer:
  ```json
  { "matched": true, "statUpdate": { "adventurous": 1 } }
  ```

- `game_complete`  
  Final results:
  ```json
  {
    "playerOneStats": { "funny": 3, "kind": 4 },
    "playerTwoStats": { "funny": 2, "kind": 5 }
  }
  ```

---

### Sync & Disconnect

- `user_disconnected`  
- `reconnect_user`
- `sync_state`  
  **Emits:** current session progress to reconnecting user.

---

## GraphQL Schema

### Queries

```graphql
getUserProfile(userId: ID!): User
getSubmittedQuestions(userId: ID!): [Question]
getApprovedQuestions(limit: Int, filters: QuestionFilterInput): [Question]
getBlockedQuestions(userId: ID!): [Question]
getSessionHistory(userId: ID!): [Session]
getSessionById(sessionId: ID!): Session
getUserStats(userId: ID!): UserStats
```

---

### Mutations

```graphql
login(email: String!, password: String!): AuthPayload
signup(username: String!, email: String!, password: String!): AuthPayload

submitQuestion(text: String!, category: String): Question
blockQuestion(questionId: ID!): Question
approveQuestion(questionId: ID!): Question

createSession(user1: ID!, user2: ID!): Session
submitAnswer(sessionId: ID!, questionId: ID!, answer: String!): Answer
completeSession(sessionId: ID!): Session

updateProfile(profileData: UpdateUserInput): User
inviteUser(email: String!): Boolean
```

---

### Subscriptions

```graphql
onNewQuestionApproved(userId: ID!): Question
onGameResult(userId: ID!): Session
onPartnerJoin(roomCode: String!): User
onQuestionFlaggedOrBlocked(userId: ID!): Question
```

---

## Notes

- Consider a hybrid approach: use **Socket.IO** for instant gameplay and **GraphQL** for persistence and account-related data.
- Apollo Client handles token injection and caching nicely with JWT-based auth.
- Use `sessionId` to correlate each match session and persist for stats and dashboard views.