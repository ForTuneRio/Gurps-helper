# GURPS Helper App

A web application for creating and managing GURPS realm lists, spaceship sheets, and automatic ritual path magic calculations.

## Development Plan

### Phase 1: Raw Project with Basic UI and Local File Saving
+ Set up basic Nuxt.js project structure
- Create default layouts, pages, components, and API endpoints
- Implement basic UI for realm and spaceship management
- Save/load data using Supabase (cloud storage with user accounts)
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
- **Styling**: Tailwind CSS
- **Database**: TBD (for Phase 3)
- **Authentication**: TBD (for Phase 3)

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