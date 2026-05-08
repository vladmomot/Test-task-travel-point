# TMDB Movie Search

A modern movie search application built with React and TypeScript using the TMDB API.
The app allows users to search for movies, browse suggestions in real time, apply advanced filters, and view movie details.

---

## Features

* 🔍 Movie search by title
* 🔗 Search results persisted in the URL
* ⚡ Real-time autocomplete suggestions
* 🎬 Movie cards with posters, ratings, genres, and release year
* 🎬 Movie details page
* 🎛 Advanced filters:
  * Language
  * Region
  * Release year
  * Page
  * Adult content toggle
* 🧭 `MoviePreferencesContext` for global search preferences
* 📄 Pagination support
* 🕘 Recent search history stored in localStorage
* ⏳ Multiple loading states:
  * Progress bar
  * Skeleton loading
  * Input spinner
* ❌ API and React error handling
* 🧱 Component-based architecture
* 🛣 Navigation to movie details page
* 🧪 Unit and component tests with Vitest and Testing Library
* 📱 Responsive UI

---

## Tech Stack

### Core

* React
* TypeScript
* Vite

### State & Data Fetching

* TanStack Query (React Query)

### Styling

* styled-components

### Routing

* React Router DOM

### HTTP Client

* Axios

### Testing

* Vitest
* React Testing Library
* jest-dom

### Other

* react-error-boundary
* ESLint
* Prettier

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/vladmomot/Test-task-travel-point.git
```

### 2. Navigate to the project

```bash
cd Test-task-travel-point/tmdb-movie-search
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env.local` file in the project root:

```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
VITE_TMDB_API_KEY=your_api_key
VITE_TMDB_JWT_TOKEN=your_jwt_token
```

You can get TMDB credentials from:

[TMDB Developer Settings](https://www.themoviedb.org/settings/api?utm_source=chatgpt.com)

### 5. Start development server

```bash
npm run dev
```

---

## Available Scripts

```bash
npm run dev        # start development server
npm run build      # production build
npm run preview    # preview production build
npm run test       # run tests
npm run lint       # run eslint
```

---

## Architecture Decisions

### Feature-Based Structure

The project uses a feature-oriented architecture to improve scalability and maintainability.

```text
src/
 ├── app/
 ├── features/
 ├── pages/
 ├── shared/
 └── test/
```

### React Query Instead of useEffect Fetching

TanStack Query was used for:

* request caching
* request deduplication
* loading/error states
* automatic request cancellation
* cleaner async logic

This significantly simplified data-fetching logic compared to manual `useEffect + useState` handling.

### Shared API Layer

A reusable TMDB API wrapper was created to centralize:

* error handling
* request configuration
* auth headers
* query parameter handling

### Error Boundaries

React Error Boundaries are used to gracefully handle unexpected React rendering errors and prevent the entire application from crashing.

### Local State Separation

Search input state and filter state are separated to avoid unnecessary requests and improve UX.

---

## Additional Features Implemented

* Search history persistence using localStorage
* Keyboard navigation in autocomplete dropdown
* Highlighted matching text in suggestions
* Request cancellation with AbortSignal
* Responsive design
* Custom skeleton loaders
* Custom progress bar
* Error fallback UI
* Debounced search input
* Basic accessibility improvements (`aria-label`, semantic roles)

---

## Testing

The project includes tests for:

* autocomplete dropdown
* results section
* search section
* filters
* search history hook
* movie preferences hook

---

## Future Improvements

* Favorites/watchlist
* Dark mode
* Better accessibility support
* E2E testing
