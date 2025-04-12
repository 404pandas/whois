# Who Is

[![License: MIT](https://img.shields.io/badge/License-MIT-FF0000.svg?style=plastic&logo=loom)](https://opensource.org/licenses/MIT)
[![Contributors](https://img.shields.io/github/contributors/404pandas/Who-Is-FFA500.svg?style=plastic&logo=githubactions)](https://github.com/404pandas/Who-Is/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/404pandas/Who-Is-FFFF00.svg?style=plastic&logo=git)](https://github.com/404pandas/Who-Is/network/members)
[![Stargazers](https://img.shields.io/github/stars/404pandas/Who-Is-00FF00.svg?style=plastic&logo=nebula)](https://github.com/404pandas/Who-Is/stargazers)
[![Issues](https://img.shields.io/github/issues/404pandas/Who-Is-0000FF.svg?style=plastic&logo=1001tracklists)](https://github.com/404pandas/Who-Is/issues)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-404pandas-4B0082.svg?style=plastic&logo=codementor)](https://linkedin.com/in/404pandas)

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Features](#features)
- [Roadmap](#roadmap)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Description

A real-time React Native game using Socket.IO where two players answer “Who is…” questions by choosing either partnerA or partnerB. After each round, they see each other’s picks and build a shared personality profile based on category data. Perfect for couples, friends, or family fun!

## Built With

<div align="center">

![Apollo](https://img.shields.io/badge/GraphQL-ApolloServer-FF0000?style=plastic&logo=apollo-graphql&logoWidth=10)
![Bcrypt](https://img.shields.io/badge/Password%20Hashing-Bcrypt-FF7F00?style=plastic&logo=Bcrypt&logoWidth=10)
![ESLint](https://img.shields.io/badge/Linter-ESLint-FFFF00?style=plastic&logo=ESLint&logoWidth=10)
![Express](https://img.shields.io/badge/Framework-Express-00FF00?style=plastic&logo=Express&logoWidth=10)
![GraphQL](https://img.shields.io/badge/Query-GraphQL-0000FF?style=plastic&logo=GraphQL&logoWidth=10)
![JWT](https://img.shields.io/badge/Auth-JWT-4B0082?style=plastic&logo=JSON-web-tokens&logoWidth=10)
![Javascript](https://img.shields.io/badge/Language-JavaScript-8B00FF?style=plastic&logo=JavaScript&logoWidth=10)
![MUI](https://img.shields.io/badge/Package-MUI-FF0000?style=plastic&logo=MUI&logoWidth=10)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-FF7F00?style=plastic&logo=MongoDB&logoWidth=10)
![Mongoose](https://img.shields.io/badge/ODM-Mongoose-FFFF00?style=plastic&logo=Mongoose&logoWidth=10)
![Node.js](https://img.shields.io/badge/Framework-Node.js-00FF00?style=plastic&logo=Node.js&logoWidth=10)
![Nodemon](https://img.shields.io/badge/Dev%20Tool-Nodemon-0000FF?style=plastic&logo=nodemon&logoWidth=10)
![React Native](https://img.shields.io/badge/Framework-React%20Native-4B0082?style=plastic&logo=React&logoWidth=10)
![Render](https://img.shields.io/badge/Cloud-Render-8B00FF?style=plastic&logo=Render&logoWidth=10)
![Stripe](https://img.shields.io/badge/API-Stripe-8B00FF?style=plastic&logo=Stripe&logoWidth=10)
![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-4B0082?style=plastic&logo=Socket.io&logoWidth=10)
![VS Code](https://img.shields.io/badge/IDE-VSCode-0000FF?style=plastic&logo=VisualStudioCode&logoWidth=10)
![Vite](https://img.shields.io/badge/Dev%20Tool-Vite-FFFF00?style=plastic&logo=vite&logoWidth=10)
![npm](https://img.shields.io/badge/Tools-npm-00FF00?style=plastic&logo=npm&logoWidth=10)
![Apollo](https://img.shields.io/badge/GraphQL-ApolloServer-FF0000?style=plastic&logo=apollo-graphql&logoWidth=10)

</div>

## Installation

**Server setup:**

```bash
cd server
npm install
npm run dev
```

Set up your `.env` file with:

- PostgreSQL credentials
- JWT secret
- Socket.IO config
- Any required third-party API keys

**Client setup (React Native):**

```bash
cd client
npm install
npx expo start
```

Make sure you have Expo CLI installed globally and a device or emulator ready to test.

## Usage

Launch both the server and the mobile client. On the app, two players connect and begin answering "Who is..." prompts. After each round, their answers are revealed, and a shared personality profile grows with each response.

## Technologies

- React Native (Expo)
- Node.js
- Express
- PostgreSQL
- Sequelize
- GraphQL
- Apollo Server
- Socket.IO
- JWT Authentication
- Redux
- Tailwind (via Nativewind)

## Features

- Real-time multiplayer game
- Personality profile building by category
- Reveal both player picks after each round
- Fun, accessible design for couples and friends
- User authentication and persistent sessions

## Roadmap

🔲 **Frontend To-Do**

- [ ] Responsive Landing Page
  - [ ] Summary of app purpose
    - [ ] CTA for login/signup  
           User Dashboard
    - [ ] User info
    - [ ] Lost/found pets posted
    - [ ] Edit profile  
           Report a Lost/Found Animal
    - [ ] Form submission with image upload
    - [ ] Location tagging via Google Maps  
           Map View (Google Maps)
    - [ ] Clustered map markers
    - [ ] Filter by species, date, status
    - [ ] Info cards for each marker  
           Animal Profile Page
    - [ ] Photo, description, location last seen
    - [ ] Contact info for reporting  
           404 and Error Pages
    - [ ] Custom styling
    - [ ] Redirects as needed

🔲 **Backend To-Do**

- [ ] GraphQL Queries & Mutations
  - [ ] User, Pet, Post, and Marker CRUD
    - [ ] Location-based filtering queries  
           Image Storage
    - [ ] Cloudinary or AWS S3 integration  
           Rate Limiting / Validation
    - [ ] Form field validation
    - [ ] Request throttling on submissions

📈 **Future Enhancements**

- [ ] In-App Chat or Message Center
  - [ ] Socket.io for real-time conversations
    - [ ] Optional notification alerts  
           Stripe Integration for Donations
    - [ ] Secure donation page
    - [ ] Email receipts via Stripe  
           Admin Panel
    - [ ] View flagged posts
    - [ ] Manage reported users
    - [ ] Moderate submissions  
           Search by Area or Zip Code
    - [ ] Geo-filter animals by user input
    - [ ] Integrate with Map page filters  
           Push Notifications / SMS Alerts
    - [ ] Notify nearby users of new sightings
    - [ ] Integrate with Twilio or Firebase  
           Mobile Optimization / React Native Version
    - [ ] Native experience for mobile users
    - [ ] Offline map access

See the [open issues](https://github.com/404pandas/Who-Is/issues) for a full list of proposed features (and known issues).

## License

This project is licensed under the MIT License.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Contact

[Mary Elenius](https://maryelenius.com/) - mary.panda.jackson@gmail.com

Project Links:

[Figma Board- link later]()

[Github Repository](https://github.com/404pandas/Who-Is)

[Deployment- link later]()
