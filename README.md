
# Open Media Search

Open Media Search is a user-friendly web application that allows users to search and explore openly licensed media using the Openverse API. It supports secure user login, media filtering, and search history, all wrapped in a clean and modern interface.

## Project Overview

The system consists of a React-based frontend and an Express backend connected to a SQL Server database. Docker is used to containerize each part of the application, making it easy to run and deploy.

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```
git clone https://github.com/HassanRazaSadiq/Software-Engineering-Assignment-.git
cd Software-Engineering-Assignment-
```

### 2. Set Up Environment Variables
Create a `.env` file in the backend folder using the provided `.env.example` as a reference.

### 3. Start the Application
Make sure Docker and Docker Compose are installed. Then run:
```
docker-compose up --build
```

The app will be available at `http://localhost:3000`.

## Running Tests

To run unit and integration tests:
```
npm run test
```

End-to-end tests can be run using Cypress:
```
npx cypress open
```

## Features

- User registration and login
- Search media using Openverse
- View and manage search history
- Secure password storage with bcrypt
- Fully containerized with Docker

## Contribution

If you’d like to contribute, feel free to fork the repo and raise a pull request. All code should follow the existing folder structure and naming conventions.

## License

This project uses content provided by Openverse and is distributed under an open license.
