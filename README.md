# Student Portal Interface Prototype

A responsive student-portal interface prototype with dashboard, course, calendar, document, finance, grade, and profile screens.

> This repository is private pending authorization to use the institution's name and visual identity. Authentication and user records are stored in browser `localStorage`; this is a prototype, not production authentication.

## Stack

Next.js, React, TypeScript, Tailwind CSS, and client-side local storage.

## Run locally

Requires Node.js and pnpm. Run `pnpm install`, then `pnpm dev`; open the local URL printed by Next.js. Use `pnpm build` to create a production build.

## Technical note

The current authentication state is browser-local and is not backed by a server identity provider or database. Do not enter real student or financial information.
