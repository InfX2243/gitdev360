gitdev360/
│
├── public/                   # Static files
│   ├── index.html            # Main HTML template (fonts, meta, root div)
│   └── favicon.ico           # App favicon
│
├── src/                      # Source code
│   ├── assets/               # Images, icons, fonts, etc.
│   │   ├── logo.png          # App logo (optional, future use)
│   │   └── user-placeholder.png  # Placeholder avatar image
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx        # App header / branding
│   │   ├── SearchBar.jsx     # Username input + analyze button
│   │   ├── ProfileCard.jsx   # Displays basic user profile info
│   │   ├── RepoList.jsx      # Displays list of repositories
│   │   ├── LanguageChart.jsx # Language distribution chart
│   │   ├── ActivityGraph.jsx # Activity / contribution visualization
│   │   ├── Metrics.jsx       # Aggregated stats + GitDev360 Score
│   │   ├── Loader.jsx        # Loading indicator
│   │   └── Error.jsx         # Error state UI
│   │
│   ├── pages/                # Route-level pages
│   │   ├── Home.jsx          # Landing page (search + intro)
│   │   ├── Profile.jsx       # User profile analytics page
│   │   ├── Compare.jsx       # Compare two GitHub users
│   │   └── About.jsx         # About / info page
│   │
│   ├── services/             # API & data-related logic
│   │   ├── githubAPI.js      # GitHub API calls (users, repos, events)
│   │   └── utils.js          # Helper functions (aggregation, formatting)
│   │
│   ├── styles/               # Global and theme styles
│   │   ├── main.css          # Global styles, layout, typography
│   │   └── dark-mode.css     # Optional dark/light theme overrides
│   │
│   ├── App.jsx               # Root component (routing, layout)
│   └── main.jsx              # Entry point (Vite render)
│
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── README.md                 # Project overview & setup
├── requirements.md           # Functional & non-functional requirements
└── structure.md              # Project folder structure
