# seym.dev

> **Note:** This README was generated with AI assistance. The project itself was designed and built by hand.

[seym.dev](https://seym.dev) is the personal portfolio and digital home of Konstantin Seym, an independent web developer. It presents selected work, professional background, services, and contact information through a focused studio-style experience.

This is a bespoke website built for a single owner and a specific identity. It is not intended to be a reusable template, starter kit, or general-purpose product.

## Overview

The project combines a polished public-facing portfolio with a private content management system. The frontend is built around a compact narrative structure: a strong introductory section, selected projects, an about section, and a direct contact flow.

All essential content can be managed without changing the source code. Payload CMS provides the editing interface, media management, access control, and storage for incoming enquiries while remaining part of the same Next.js application.

## Key Features

- responsive portfolio and studio-style landing page;
- dedicated pages for individual projects;
- CMS-managed projects, profile content, contacts, interface labels, and legal copy;
- image and media management through Payload CMS;
- contact form with enquiries stored in a private admin collection;
- smooth scrolling and motion-driven interface details;
- local variable font with optimized loading;
- dynamic metadata for project pages;
- Open Graph and social sharing metadata;
- sitemap, robots.txt, favicon set, and web app manifest;
- privacy policy page managed through the CMS;
- Russian-language website and admin interface.

## Technology Stack

### Application

- **Next.js 16** — full-stack application framework using the App Router;
- **React 19** — component-based user interface;
- **TypeScript** — static typing across the application and CMS schemas;
- **Payload CMS 3** — content management, admin interface, authentication, API, and access control;
- **PostgreSQL** — persistent storage through the official Payload database adapter.

### Interface

- **Tailwind CSS 4** — styling infrastructure and build-time CSS processing;
- **Motion** — interface transitions and animation orchestration;
- **Lenis** — smooth scrolling behavior;
- **Montserrat Variable** — locally hosted variable font;
- **Sharp** — server-side image processing.

### Tooling

- **ESLint** with the Next.js configuration;
- **PostCSS** for CSS processing;
- generated Payload TypeScript definitions;
- generated Payload admin import map.

## Architecture

The public website and Payload CMS run inside one Next.js application. Route groups keep both concerns separate while allowing them to share the same runtime, data layer, and type definitions.

```text
src/
├── app/
│   ├── (frontend)/       # public website and project pages
│   └── (payload)/        # Payload admin panel, REST API, and GraphQL API
├── assets/               # local fonts and static source assets
├── collections/          # projects, media, users, and incoming leads
├── data/                 # server-side content queries
├── globals/              # site-wide CMS-managed content
├── lib/                  # motion and smooth-scroll configuration
├── payload.config.ts     # Payload CMS configuration
└── payload-types.ts      # generated CMS types
```

The frontend uses React Server Components for content delivery and small client-side components only where browser interaction or animation is required. Data access is kept in dedicated query modules rather than being embedded throughout the presentation layer.

## Content Model

### Projects

Each portfolio project contains:

- name and unique URL slug;
- display order;
- short description;
- primary and secondary imagery;
- extended project overview;
- technology stack;
- optional link to a live demo.

Projects are displayed on the main page and rendered as dedicated detail pages under `/projects/[slug]`.

### Global Content

Payload globals manage content that belongs to the website as a whole:

- **Site Settings** — branding, navigation labels, section headings, form copy, and interface text;
- **About** — portrait and structured profile sections;
- **Contacts** — external contact methods and links;
- **Privacy Policy** — structured legal content.

### Leads and Media

The public contact form creates entries in a dedicated leads collection. New enquiries can be submitted without authentication, while reading, updating, and deleting them is restricted to authenticated administrators.

Uploaded media is managed through Payload and exposed publicly for use across the portfolio. Descriptive alternative text is required for every media item.

## Frontend Experience

The visual experience is intentionally restrained and content-led. Motion is used to support hierarchy and navigation rather than distract from the work itself. Smooth scrolling, responsive layouts, optimized local typography, and carefully scoped interactive components keep the experience consistent across screen sizes.

The main page is organized into four parts:

1. an introductory hero and navigation;
2. a selection of portfolio projects;
3. professional background and capabilities;
4. contact information and enquiry form.

Individual project pages expand on the work with additional imagery, an overview, the technology stack, and an optional external demo.

## SEO and Platform Support

The application includes the core metadata and discovery features expected from a production portfolio:

- canonical URLs;
- page titles and descriptions;
- Open Graph previews;
- large Twitter/X sharing cards;
- project-specific metadata;
- generated sitemap and robots directives;
- favicon and Apple touch icon assets;
- web app manifest and theme color;
- a dedicated social preview image.

## Access Control

Public content is readable without authentication. Content creation and editing are restricted to authenticated Payload users, with the exception of contact form submissions. Administrative users can manage projects, global content, media, and incoming leads through `/admin`.

## Project Scope

seym.dev is a private, owner-operated portfolio project. Its content model, visual language, and editorial workflow are designed specifically for one professional identity. The repository documents the implementation of that website rather than offering a distributable theme or a configurable product.

## Author

[Konstantin Seym](https://seym.dev)
