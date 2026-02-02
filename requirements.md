# Functional Requirements

## 1. User Profile Fetching
- Input: GitHub username
- Fetch public user information using the GitHub Public API
- Display core profile details:
  - Avatar
  - Name
  - Username
  - Bio
  - Location
  - Website
  - Account creation date
  - Followers / Following count

## 2. Repository Analysis
- Fetch and list all public repositories of the user
- Display per-repository stats:
  - Repository name
  - Description
  - Primary language
  - Stars
  - Forks
  - Open issues
  - Last updated date
- Aggregate repository statistics:
  - Total repositories
  - Total stars
  - Total forks
  - Total open issues

## 3. Activity & Contributions
- Display recent public activity/events
- Show contribution/activity graph (based on events data)
- Show recent commits (derived from Push events)
- Language usage breakdown across all repositories

## 4. Developer Metrics / Insights
- Identify top repositories by:
  - Stars
  - Forks
  - Activity
- Determine most-used programming languages
- Analyze activity trends:
  - Monthly activity
  - Weekday vs weekend contributions
- Compute a custom **GitDev360 Score** based on:
  - Activity level
  - Popularity (stars/forks)
  - Consistency over time

## 5. Comparison Feature
- Compare two GitHub users side by side
- Fetch data for both users in parallel
- Compare:
  - Profile information
  - Repository statistics
  - Language usage
  - Activity metrics
  - GitDev360 Score
- Visually highlight similarities and differences

## 6. Search & Error Handling
- Search bar to enter GitHub usernames
- Validate input before API requests
- Handle invalid usernames gracefully
- Handle API errors and rate-limit issues
- Display loading indicators during API requests

---

# Non-Functional Requirements

- **Performance**
  - Minimize API calls
  - Use parallel requests where possible
- **API Rate Handling**
  - Respect GitHub public API limits
  - Implement client-side caching where applicable
  - Support optional authenticated requests via token
- **No Database**
  - Entirely client-side application
- **Maintainability**
  - Modular, reusable React components
  - Clear separation of pages, components, and services
- **Accessibility**
  - Keyboard-friendly navigation
  - Reduced-motion support
  - Proper semantic HTML

---

# Pages

## 1. Home / Landing Page (`/`)
**Purpose:** Introduce the app and allow users to start analysis.

### Tasks / Features
- Display app name and branding
- Show tagline/description
- Search bar for GitHub username
- Optional dark/light mode toggle
- Optional example or popular GitHub users

---

## 2. Profile Page (`/profile/:username`)
**Purpose:** Display complete analysis for a single GitHub user.

### Tasks / Features
- Show profile information
- Display repositories with key stats
- Show top languages (chart or list)
- Display activity/contribution graph
- Show aggregated metrics and GitDev360 Score
- Handle errors (user not found, rate limit reached)

---

## 3. Compare Page (`/compare`)
**Purpose:** Compare two GitHub users side by side.

### Tasks / Features
- Inputs for two GitHub usernames
- Fetch and process both users’ data simultaneously
- Side-by-side comparison of:
  - Profile info
  - Repositories
  - Languages
  - Activity
  - Metrics and scores
- Visual indicators for better/worse metrics

---

## 4. About / Info Page (`/about`)
**Purpose:** Provide information about the project.

### Tasks / Features
- Explain GitDev360 and its features
- Link to the project’s GitHub repository
- Developer/portfolio information

---

# User Flow

## 1. Landing / Home Page
**URL:** `/`  
**Purpose:** Entry point for the application.

### User Actions
1. User opens the app.
2. User views title, tagline, and search bar.
3. User enters a GitHub username.
4. User presses Enter or clicks the search button.

### System Actions
1. Validate input.
2. Navigate to `/profile/:username`.
3. Show loading state during navigation.

### Components
- `Header` – App name / branding
- `SearchBar` – Username input and submit action
- `LandingInfo` – Tagline and feature overview
- `PopularUsers` – Example usernames (optional)

---

## 2. Profile Page (Single User)
**URL:** `/profile/:username`  
**Purpose:** Show detailed GitHub analysis.

### User Actions
1. Page loads with username from URL.
2. User sees loading indicator.
3. Profile and analytics data are displayed.
4. User scrolls through repositories, charts, and metrics.

### Optional User Actions
- Click repository to open on GitHub (new tab)
- Toggle between different metric views

### System Actions
1. Fetch user profile data (`GET /users/{username}`)
2. Fetch repositories (`GET /users/{username}/repos`)
3. Fetch language data per repository
4. Fetch recent activity (`GET /users/{username}/events/public`)
5. Compute aggregated metrics and scores
6. Render data via UI components

### Components
- `ProfileCard`
- `RepoList`
- `LanguageChart`
- `ActivityGraph`
- `Metrics`
- `Loader`
- `Error`

---

## 3. Compare Page
**URL:** `/compare`  
**Purpose:** Compare two developers.

### User Actions
1. Enter two usernames.
2. Click "Compare".
3. View side-by-side analysis.

### System Actions
1. Fetch both users’ data in parallel.
2. Aggregate and normalize metrics.
3. Render comparison visuals.

### Components
- `UserInputCompare`
- `ComparisonPanel`
- `ComparisonGraph`
- `Loader`
- `Error`

---

## 4. About / Info Page
**URL:** `/about`  
**Purpose:** Inform users about the project.

### Components
- `AboutText`
- `DeveloperInfo`
- `RepoLink`
