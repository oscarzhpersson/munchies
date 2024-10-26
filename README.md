# Munchies

[![Website](https://img.shields.io/website-up-down-green-red/http/munchies-op.vercel.app.svg)](munchies-op.vercel.app)

![Build Status](https://github.com/oscarzhpersson/munchies/actions/workflows/continuous-integration.yml/badge.svg)
![Last Commit](https://img.shields.io/github/last-commit/oscarzhpersson/munchies)

Welcome to **Munchies**, a restaurant service frontend application designed to help users discover and filter local restaurants. Built with Next.js, Tailwind CSS, and Payload CMS, this project focuses on performance, responsive design, and a seamless user experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Testing](#testing)

## Features
- **Restaurant Listings**: Display restaurants with details like name, rating, delivery time, and price range.
- **Dynamic Filtering**: Filter restaurants by category, delivery time, and price range.
- **Overlay Management**: Custom overlays for promotional or additional information.
- **Responsive Design**: Optimized layout for both mobile and desktop views.
- **Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR)**: Enhanced performance through efficient data fetching and caching.

## Tech Stack
- **Next.js** for SSR and routing
- **TypeScript** for static typing
- **Payload CMS** as the headless CMS
- **Tailwind CSS** for styling
- **PostgreSQL** as the database
- **Vercel** for deployment and CD
- **Github Actions** for continuous integration
- **Jest** and **React Testing Library** for testing

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/oscarzhpersson/munchies.git
   cd munchies
   ```

2. **Install dependencies:**
    ```bash
    yarn install
    ```

3. **Set up environment variables:**

    Create a .env file in the root directory with the required environment variables listed below.

    ## Environment Variables
    Here’s a list of the key environment variables required to run the project. Make sure to replace placeholder values with actual credentials.

    ```bash
    # Next.js and API
    NEXT_PUBLIC_APP_URL=<Your frontend URL>
    NEXT_PUBLIC_BASE_URL=<Base API URL>

    # Payload CMS
    PAYLOAD_SECRET=<Payload CMS Secret Key>
    POSTGRES_URI=postgresql://<username>:<password>@<host>:<port>/<database>

    # Vercel Blob Storage (if applicable)
    BLOB_READ_WRITE_TOKEN=<Vercel Blob Storage token>
    ```

## Scripts

```yarn dev```: Start the development server.

```yarn build```: Build the project for production.

```yarn start```: Start the production server.

```yarn test```: Run tests using Jest and React Testing Library.

```yarn lint```: Run ESLint to check for code issues.

## Testing

The project includes unit and integration tests, focusing on critical components like filters and data transformations. Tests are located in the src/tests directory. To run tests, use:

```bash
yarn test
```
