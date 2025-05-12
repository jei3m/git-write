# GitWrite
 
![Screenshot 2025-05-12 215456](https://github.com/user-attachments/assets/7033c098-7357-4156-9e60-456eb39495bd)
GitWrite provides a streamlined interface for writing documentation through the use of templates and fetching README files from your public GitHub repositories, helping developers create consistent documentation without repetitive work.

## Features

- **Markdown Editor**: A full-featured markdown editor with support for common formatting options including headers, lists, code blocks, and more.

- **Dark/Light Mode**: Seamless theme switching between dark and light modes for comfortable editing in any environment.

- **Template Management**: Create, edit, and save reusable markdown templates to maintain consistency across projects and avoid rewriting common documentation sections.

- **GitHub Repository Integration**: Connect to your GitHub account to access your repositories, view existing README files, and update them directly.

- **Download Option**: Export your markdown files locally with a simple download function.

- **User Authentication**: Secure user authentication and protected routes powered by Firebase.

- **Responsive Design**: A clean, modern interface that works well on various screen sizes, built with Tailwind CSS.

## Technologies Used

- **React**: A JavaScript library for building user interfaces, providing a component-based architecture for the frontend.

- **TypeScript**: A strongly typed programming language that builds on JavaScript, enhancing code quality and developer experience.

- **Vite**: A modern frontend build tool that provides a faster and leaner development experience.

- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.

- **Firebase Auth**: Authentication and user management service that handles user sign-in and identity.

- **Zustand**: A small, fast, and scalable state-management solution for React applications.

- **React Markdown Editor**: The `@uiw/react-markdown-editor` component provides a rich editing experience with live preview.

- **Express.js**: A minimal and flexible Node.js web application framework used for the backend API.

- **MongoDB**: A NoSQL database used to store user templates and other application data.

- **GitHub API**: Used to fetch repositories and README files from users' GitHub accounts.

## Installation

To set up GitWrite locally, follow these steps:

1. **Clone the Repository**
    
    ```shell
    git clone https://github.com/jei3m/gitwrite
    cd gitwrite
    ```
    
2. **Install Dependencies**
    
    ```shell
    # Install frontend dependencies
    cd frontend
    npm install
    
    # Install backend dependencies
    cd ../backend
    npm install
    ```
    
3. **Set Up Environment Variables**
    
    Create a `.env` file in the root directory of both frontend and backend folders.
    
    Frontend `.env` file:
    ```dotenv
    VITE_API_URL=http://localhost:5000
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```
    
    Backend `.env` file:
    ```dotenv
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    ORIGIN_URL=http://localhost:5173
    ```
    
4. **Start the Development Server**
    
    ```shell
    # Start backend server
    cd backend
    npm run dev
    
    # In a new terminal, start frontend server
    cd frontend
    npm run dev
    ```
    
5. **Open Your Browser**
    
    Navigate to `http://localhost:5173` to view the application.
    

## Usage

- **Creating Templates**: Click on the "Create template" button to create reusable markdown templates for your documentation.

- **Editing Templates**: Select a template from the dropdown menu and modify it as needed. Changes can be saved for future use.

- **Working with GitHub Repositories**: Select the "Repository" option from the feature dropdown, connect your GitHub account, and choose a repository to view or edit its README.

- **Downloading README Files**: Click the download button to save your markdown file locally.

- **Publishing to GitHub**: When working with a repository, use the publish button to update the README directly on GitHub (a feature still in development).
