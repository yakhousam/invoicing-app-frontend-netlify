# Invoicing App Frontend

This project is the frontend component of the Invoicing App, a microservices-based application designed to manage and generate invoices. The frontend is built using modern web technologies to provide a seamless user experience.

## Features

- User authentication and authorization
- Dashboard to view and manage invoices
- Create, edit, and delete invoices
- Search and filter invoices
- Responsive design for mobile and desktop

## Technologies Used

- React
- Tanstack Router
- Tanstack React Query
- TypeScript
- Material-UI

## Getting Started

### Prerequisites

- Node.js (>=18.x)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yakhousam/invoicing-app-frontend-netlify.git
    ```
2. Navigate to the project directory:
    ```bash
    cd invoicing-app-frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
4. Rename `.env.example` to `.env` and fill in the environment variables:
    ```bash
    mv .env.example .env
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn run dev
    ```
2. Open your browser and navigate to `http://localhost:3001`.

### Building for Production

1. Build the application:
    ```bash
    npm run build
    ```
    or
    ```bash
    yarn build
    ```
2. The production-ready files will be in the `build` directory.

## License

This project is licensed under the MIT License.

