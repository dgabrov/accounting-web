# Accounting Web Application

A web-based accounting management system built with React and TypeScript, featuring transaction management, account tracking, company administration, and financial reporting.

## Features

- **Account Management** - Create, edit, and manage multiple accounts
- **Transaction Tracking** - Record and manage financial transactions with date and currency support
- **Company Management** - Administer multiple companies within the system
- **Financial Reports** - Generate detailed reports including:
  - Account balance reports
  - Transaction reports
  - Account-specific reports
  - Excel export functionality
- **User Authentication** - Secure login system
- **Responsive Interface** - Built with React for a modern user experience

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Ensure the backend API is running on `http://localhost:3001` (configured via proxy in package.json)

## Development

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000` and proxy API requests to `http://localhost:3001`.

### Building

Create a production build:
```bash
npm run build
```

### Testing

Run tests:
```bash
npm test
```

## Tech Stack

- **React** 18.2 - UI framework
- **TypeScript** - Type-safe JavaScript
- **Redux** - State management
- **React Redux** - Redux bindings for React
- **React DatePicker** - Date selection component
- **React Currency Input** - Currency input handling
- **Moment.js** - Date manipulation and formatting
- **React Select** - Dropdown selection component

## License

This project is licensed under the GNU General Public License v2.0. See the [LICENSE](../LICENSE) file for details.
