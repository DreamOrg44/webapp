# webapp
#CSYE 6225 Spring 2024 Course

### Prerequisites ###
Before you start, ensure that you have the following tools and dependencies installed on your machine:

- Node.js (https://nodejs.org/) - JavaScript runtime - 19
- npm (https://www.npmjs.com/) - Node.js package manager - 8.19.3
- Git (https://git-scm.com/) - Version control system - git version 2.39.3 (Apple Git-145)
- Database System - postgres (PostgreSQL) 14.10 (Homebrew)

### Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
<!-- 
3. **Configure Environment Variables:**
   Create a `.env` file in the root of your project and set the necessary environment variables. Use a template or example `.env` file if provided. -->

3. **Database Setup:**
   If your application uses a database, run database migrations and seed data if applicable.
   ```bash
   npm run migrate  # Example command, adjust based on your project
   ```

4. **Build the Application:**
   ```bash
   npm run build
   ```

5. **Start the Application:**
   ```bash
   npm start
   ```

[http://localhost:3000](http://localhost:3000)

### Additional Commands

- **Run Tests:**
  ```bash
  npm test
  ```

<!-- - **Linting:**
  ```bash
  npm run lint
  ``` -->


Assignment 4:

1) first created a service account and granted the roles as needed and given in assignment description.
2) 

Packer folder created.
1) packer init .
2) packer build .

cd /etc/ and passwd file to see if the user is created.

Update project id to dev one which is created for assignment 4.
destroy terraform everytime there is an update in the web application so that new image will be created and referred so.
