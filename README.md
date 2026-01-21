# GURPS Helper App

A web application for creating and managing GURPS realm lists, spaceship sheets, and automatic ritual path magic calculations.

## Development Plan

### Phase 1: Raw Project with Basic UI and Local File Saving
- Set up basic Nuxt.js project structure
- Create default layouts, pages, components, and API endpoints
- Implement basic UI for realm and spaceship management
- Add functionality to save/load data locally (using localStorage or file downloads)
- Basic CRUD operations for realm and spaceship data

### Phase 2: UI Enhancement
- Improve user interface with better styling and UX
- Add form validation and error handling
- Implement responsive design
- Add more detailed realm and spaceship components
- Enhance navigation and layout

### Phase 3: Authentication and Cloud Saving
- Implement simple user registration and login
- Add user accounts and session management
- Enable saving data to user accounts (database integration)
- Add sharing and collaboration features

## Features

- **Realm Lists**: Manage lists of realms
- **Spaceship Sheets**: Create spaceship sheets
- **Ritual Path Magic Calculator**: Automatic calculation of ritual path magic
- **Local Storage**: Save files locally for offline use
- **User Accounts**: Register/login to save data in the cloud

## Tech Stack

- **Framework**: Nuxt.js 4
- **Language**: TypeScript
- **Styling**: Tailwind CSS (planned)
- **Database**: TBD (for Phase 3)
- **Authentication**: TBD (for Phase 3)

## Project Structure

```
├── app.vue                 # Main app component
├── nuxt.config.ts          # Nuxt configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # Package lock file
├── README.md               # This file
├── app/                    # App directory (Nuxt 4)
│   ├── app.vue                 # Main app component
│   ├── layouts/                # Page layouts
│   │   └── default.vue
│   └── pages/                  # Application pages
│       ├── index.vue
│       ├── calculator/
│       │   └── index.vue
│       ├── realms/
│       │   └── index.vue
│       └── spaceships/
│           └── index.vue│   └── server/                 # Server-side code
│       └── api/                # API endpoints
│           └── magic/
│               └── calculate.post.ts├── components/             # Reusable components
│   ├── ui/                 # UI components
│   ├── RitualMagicCalculator.vue
│   ├── RealmList.vue
│   └── SpaceshipSheet.vue
├── composables/            # Reusable logic
│   ├── useMagicCalculator.ts
│   ├── useRealms.ts
│   └── useSpaceships.ts
├── types/                  # TypeScript types
│   ├── magic.ts
│   ├── realm.ts
│   └── spaceship.ts
└── utils/                  # Utility functions
    └── calculations.ts
```

## Setup

```
pnpm install

pnpm dev
```
## Production
```
pnpm build

pnpm preview
```