# Full requirements: https://www.notion.so/Senior-Software-Engineer-b328299048834566b587e45087035348#fdd1eac2d0774203922452b9d2dc807b

- Frontend: React, ChakraUI, Charts.js

- Backend, Express.js, Postgres, JWT

# To get started

## Prerequisites

- Node.js
- Postgres

## Start backend services with:

### Database Connection Information

- Database Host: `localhost`
- Port: `5432`
- Username: `vij`
- Password: `vij2023`
- Database Name: `miners`

### Command-Line Loading (PostgreSQL)

- Open your terminal and run the following command to load the SQL file:
  `psql -U vij -d miners -a -f miners.sql -W`
- it will ask for password, so type `vij2023` and press enter

- if the above doesn't work, you will need to add a superuser first:

  - in terminal type:
    `psql -U postgres`
    `CREATE USER vij WITH SUPERUSER PASSWORD 'vij2023';`
  - to verify type:
  - `\du`

- Start the server
  `node index.js`

## Start frontend with:

### `npm start`

- site login credentials:
- username: `satoshi`
- password: `nakomoto`
