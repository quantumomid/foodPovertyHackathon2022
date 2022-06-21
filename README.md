# AccelerAid

Repository for team 1 of the 2022 [Deen Developers Food Poverty Hackathon](https://foodpovertyhack.deendevelopers.com/).

## Tech stack and links

Some useful links from our project:
- [Deployed site](https://acceleraid.vercel.app/) using Vercel
- [Figma screens](https://www.figma.com/file/UB8ByD9m5l86Prqu1k5vvW/Hackathon-for-Food-Poverty?node-id=10%3A1022) including components, user flows, wireframes, etc.
- [Team Notion](https://www.notion.so/Team-1-0eb17c25ecd64ab2915a756450c19995) includes details on the problem statement we are solving, api docs, etc.
- [Marketing site](https://acceleraid.carrd.co/) includes details of solution, problem statement being tackled and more.

The tech we used comprises 👨‍💻:
- [Next.js](https://nextjs.org/) implementation of React ⚡
- [Redux](https://redux.js.org/) (for state management) 🗽
- [Firebase](https://firebase.google.com/) (authentication and user data storage) 👮‍♀️
- [Chakra UI](https://chakra-ui.com/) (for styling) 🎨

## Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

The `/backend` folder of the repo contains the Firebase Functions that were used to create the backend API endpoints.

### Getting started

`npm install -g firebase-tools`

Once you are added as a contributor to our team's foodPovertyHackathon Firebase project, run `firebase login` to login and authenticate your firebase CLI tool.

### Run the functions locally

Follow the instructions [here:](https://firebase.google.com/docs/functions/get-started#emulate-execution-of-your-functions) running the emulator command from the `/backend` folder

### Deploy updated functions to Prod

Run the command `firebase deploy --only functions` from the `/backend/functions` folder.


