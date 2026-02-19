# GURPS Helper App

GURPS Helper is a Nuxt 4 web app for managing GURPS realms and spaceships and for calculating Ritual Path Magic. It uses Vue 3, TypeScript, Tailwind CSS, and Supabase for authentication and data persistence.

## Current Status

### Working

- **Auth pages**
- **Realm management** with Supabase-backed CRUD:
	- list, create, edit, delete (requires login).
	- detailed Realm Builder form with calculations and summaries.
- **Ritual Path Magic** calculator:
	- Spell Crafter (effects + modifiers -> total energy).
	- Spell Roller (rolls until required energy, with crit rules).

### Partial / Placeholder

- **Spaceships** page and sheet UI are placeholders (no full editor or list yet).

## What To Do Next

- Build the Spaceship CRUD UI and connect it to Supabase data.
- Add collaborative or sharing features.

## Tech Stack

- **Framework**: Nuxt 4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth & Data**: Supabase