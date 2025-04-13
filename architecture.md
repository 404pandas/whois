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


## Additional Socket.IO Events for Room Code System

### Room Management
- **create_room**: `{ userId: string }`  
  Server creates a room with a unique code.  
  Emits: `room_created`

- **room_created**: `{ roomCode: string }`  
  Confirms that a room has been successfully created.

- **join_room**: `{ roomCode: string, userId: string }`  
  Attempts to join an existing room.

- **invalid_room**: `{ message: string }`  
  Sent when room code is invalid or the room is full.

- **room_full**: `{ message: string }`  
  Sent when an extra user tries to join a full room.

- **room_status**: `{ usersInRoom: array, roomCode: string }`  
  Provides current room status.

### Pre-Game Lobby
- **user_ready**: `{ userId: string, roomCode: string }`  
  Indicates a user is ready to begin.

- **both_ready**: `{ roomCode: string }`  
  Emitted when both users are ready. Triggers game start.

- **cancel_room**: `{ roomCode: string }`  
  Cancels the room and notifies all users.

- **kick_user**: `{ userId: string, roomCode: string }`  
  Removes a user from the lobby.

### In-Game Sync
- **sync_state**: `{ roomCode: string, currentState: object }`  
  Used to resync a reconnecting user.

- **force_restart**: `{ roomCode: string }`  
  Restarts the session from scratch.

- **ping / pong**: Used for health checks and latency tracking.

### Post-Game
- **rematch_request**: `{ userId: string, roomCode: string }`  
  Sent when a user wants a rematch.

- **rematch_accepted**: `{ roomCode: string }`  
  Starts a new session after mutual acceptance.

- **exit_to_dashboard**: `{ userId: string }`  
  Cleans up sockets and disconnects the user from the room.
