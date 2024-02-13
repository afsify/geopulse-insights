# GeoPulse Insights

Welcome to GeoPulse, your comprehensive platform for exploring and analyzing country data. GeoPulse leverages the REST Countries API to provide detailed information about various countries. The project includes features such as a dashboard with charts (bar chart, pie chart, and gauge charts), a user authentication system, a profile page, a settings page, and a country page. Users can also search, filter, and view information about all countries, including flags and details.

## Features

- **Secure Authentication:** Users can log in and sign in with Google for a secure and personalized experience.
- **Role-Based Authentication:** Differentiate between admin and user roles for tailored access and permissions.
- **Informative Charts:** Explore country data through visually appealing charts, including bar charts, pie charts, and gauge charts.
- **User Profile** View and edit user profiles with ease.
- **Personalized Settings:** Adjust account settings, including preferences for notifications and language.
- **Comprehensive Country Information:** Access detailed information about countries, including flags and specific details.
- **Search and Filter:** Easily search and filter country data for a customized view.
- **Redux Toolkit Integration:** Manage global state efficiently using Redux for seamless data flow.

## Tools and Technologies

### Client-Side Libraries

- **React.js:** A JavaScript library for building user interfaces.
- **Redux.js:** A predictable state container for JavaScript apps.
- **TailwindCSS:** A utility-first CSS framework for rapidly building custom designs.
- **Ant Design:** A design system for enterprise-level products.

**HTTP Client:**

- **Axios:** A promise-based HTTP client for making requests to APIs. Axios is used to interact with the server-side API.

- **Fetch API:** A modern browser interface for fetching resources, used to interact with the REST Countries API.

### Server-Side Technologies

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A minimal and flexible Node.js web application framework.
- **MongoDB (Mongoose):** A NoSQL database used to store and retrieve data.
- **JWT Token:** JSON Web Token for user authentication.

## Access the live project

The live project can be accessed at [https://geopulse.vercel.app](https://geopulse.vercel.app)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mhdafs/geopulse-insights.git
   ```

2. **Set up environment variables:**

    Create a `.env` file in the root directory or rename the current `.env.sample` file and configure necessary variables for client and server sides.

    **Client ENV**

   ```bash
    VITE_GOOGLE_ID = google-auth-id
    VITE_USER_URL = user-base-url
    VITE_DEMO_EMAIL = user-demo-email
    VITE_DEMO_PASSWORD = user-demo-password
    VITE_COUNTRY_API = country-api-url
   ```

3. **Navigate to the client directory:**

    Open a terminal in Visual Studio Code and split it into two terminals. In the first terminal, navigate to the client directory:

    ```bash
    cd client
    ```

4. **Install client side dependencies:**

    ```bash
    npm install
    ```

5. **Start the client-side application:**

    ```bash
    npm start
    ```

6. **Start the client-side application:**

    ```bash
    npm start
    ```

    The client-side application will be running on [http://localhost:3000](http://localhost:3000)

## API Documentation

Detailed API documentation can be found in the [REST Countries API](https://restcountries.com)

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.
