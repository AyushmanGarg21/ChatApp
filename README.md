# ChatApp - MERN Stack Web Development Project

## Overview
ChatApp is a dynamic web application developed using the MERN (MongoDB, Express.js, ReactJS, Node.js) stack. It provides users a seamless platform to register, log in, set avatars, and engage in real-time text and emoji-based conversations. The project also integrates an AI component, allowing users to interact with an intelligent chatbot.

## Features
- **User Authentication:**
  - Users can easily register and log in to the platform, ensuring a personalized experience.

- **Avatar Customization:**
  - Upon registration, users can set avatars, adding a touch of personalization to their profiles.

- **Real-time Chat:**
  - Users can engage in live text and emoji-based conversations with all other registered users.

- **Online Status Indicator:**
  - A green dot is displayed to indicate the online status of users, enhancing the real-time communication experience.

- **AI Integration:**
  - The application incorporates an AI chatbot, allowing users to interact with an intelligent virtual assistant.

## Technology Stack
- **Front-end:**
  - Developed using ReactJS, ensuring a responsive and user-friendly interface.
  - Styled components are employed for efficient and modular CSS.

- **Back-end:**
  - Node.js and Express.js are utilized to handle server-side functionalities.
  - Socket.io is employed for establishing real-time communication between users.

- **Database:**
  - MongoDB is the chosen database for storing user data and chat logs.

- **APIs:**
  - The project utilizes the MultiAvatar API to generate a variety of avatars for users.
  - OpenAI is integrated to power the ChatAppAI, providing intelligent responses during user interactions.

- **Data Communication:**
  - Axios is employed to fetch and store data in the MongoDB database, ensuring seamless data flow.

## Getting Started
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using the package manager of your choice (npm or yarn).
4. Configure your MongoDB connection and OpenAi API key in the server-side code.
5. Navigate to client/src/utils/APIRoutes.js and update the host with your server port.
6. Run the server and the front-end application.
7. Access the application through your web browser.

## Acknowledgments
- The project makes use of various open-source libraries and APIs, contributing to its functionality and appeal.

Feel free to explore, experiment, and enjoy using ChatApp - your go-to platform for interactive and engaging conversations!
