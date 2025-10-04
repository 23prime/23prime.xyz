# Frontend

React-based frontend application for the personal homepage.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable UI components
- **pnpm** - Package manager

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

### Build

Build for production:

```bash
pnpm build
```

The output will be in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
pnpm preview
```

### Lint

Run ESLint:

```bash
pnpm lint
```

## Project Structure

```text
src/
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── lib/             # Utility functions
│   └── utils.ts     # cn() for Tailwind class merging
├── App.tsx          # Main app component with routes
├── main.tsx         # Application entry point
└── index.css        # Global styles and Tailwind directives
```

## Adding UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for UI components.

To add a new component:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Example:

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
```

## Path Aliases

The project uses `@/` as a path alias for the `src/` directory:

```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## Styling

Tailwind CSS is configured with custom CSS variables for theming. The theme supports both light and dark modes.

CSS variables are defined in `src/index.css` and can be customized in `tailwind.config.js`.
