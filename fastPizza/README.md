# Fast React Pizza Co.

Welcome to the Fast React Pizza Co. project! This is a web application for ordering pizzas, built with React, Redux, and TypeScript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/Amadou-dot/Fast-Pizza.git
cd fast-react-pizza-co
```

2. Install the dependencies:
```sh
npm install
```

## Usage

To start the development server, run:

```sh
npm run dev
```

To build the project for production, run:

```sh
npm run build
```

To preview the production build, run:

```sh
npm run preview
```

To lint the code, run:

```sh
npm run lint
```

## Features

Browse the pizza menu
Add pizzas to the cart
Update item quantities in the cart
Remove items from the cart
Create an order
View order status
Search for orders

## Project Structure

```
src/
├── App.tsx
├── features/
│ ├── cart/
│ ├── menu/
│ ├── order/
│ └── user/
├── services/
├── ui/
├── utils/
├── index.css
├── main.tsx
├── store.ts
└── vite-env.d.ts
```

- **features**: Contains the main features of the application (cart, menu, order, user).
- **services**: Contains API service functions.
- **ui**: Contains reusable UI components.
- **utils**: Contains utility functions and interfaces.

## Contributing

Contributions are welcome! Open an issue or submit a pull request.
