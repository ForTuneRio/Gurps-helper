# GURPS Helper App

**Live at:** [https://www.gurps-helper.com/](https://www.gurps-helper.com/)

GURPS Helper is a Nuxt 4 web app for managing GURPS realms and spaceships and for calculating Ritual Path Magic. It uses Vue 3, TypeScript, Tailwind CSS, and Supabase for authentication and data persistence.

**Status:** Still in development, but usable.

## Current Status

### Working

- **Auth pages**
- **Realm management** with Supabase-backed CRUD:
	- list, create, edit, delete (requires login).
	- Realm Builder form with calculations and summaries.
- **Ritual Path Magic**
	- Spell Crafter
	- Spell Roller

## What To Do Next

- Add **InfoBox component** for attribute tooltips/help text
- Add infoboxes for attributes in **Realm management** and **Rituals**
- Complete **Spaceship CRUD UI**
- Add **Military / Mass Combat**
- Add collaborative or sharing features

## Tech Stack

- **Framework**: Nuxt 4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth & Data**: Supabase