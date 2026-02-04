# Contributing to Tide Pool Kids

Welcome! We're excited that you're interested in contributing to Tide Pool Kids. This educational game helps K-8 students explore Bay Area tide pools and ecosystems, and we'd love your help making it even better.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/tide-pool-kids.git
   cd tide-pool-kids
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Ways to Contribute

### Code

- Fix bugs or implement new features
- Improve accessibility (we aim for WCAG 2.2 AAA)
- Optimize performance
- Write tests

### Content

- Add new locations with descriptions and fun facts
- Create quiz questions for existing locations
- Add new creatures to discover
- Write age-appropriate educational content (K-2, 3-5, or 6-8)

### Design

- Improve UI/UX
- Create new game assets
- Enhance animations and visual feedback

### Documentation

- Improve README or this guide
- Write tutorials
- Document code

### Testing

- Report bugs with detailed reproduction steps
- Test on different devices and browsers
- Test with assistive technologies

## Issue Labels

- `good-first-issue` — Great for newcomers, well-scoped tasks
- `help-wanted` — We'd especially appreciate help here
- `bug` — Something isn't working correctly
- `enhancement` — New feature or improvement
- `content` — Adding or improving educational content
- `accessibility` — Accessibility improvements
- `documentation` — Documentation updates

## Pull Request Process

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Ensure your code follows existing patterns and passes linting:
   ```bash
   npm run lint
   ```
4. Test your changes thoroughly
5. Commit with a clear, descriptive message:
   ```bash
   git commit -m "Add new tide pool location: Pillar Point"
   ```
6. Push to your fork and open a pull request
7. Fill out the PR template with details about your changes

## Code Style

- We use TypeScript for type safety
- Follow existing code patterns and file organization
- Use meaningful variable and function names
- Keep components focused and reusable
- Add comments for complex logic

## Adding Content

### New Location

Locations are defined in `src/data/locations.ts`. Each location needs:

- Unique ID
- Name and coordinates
- Category (tide pools, beaches, forests, wetlands, infrastructure)
- Age-appropriate descriptions (K-2, 3-5, 6-8)
- Fun facts
- Associated creatures
- Quiz activities

### New Creature

Add creatures to the location's `creatures` array with:

- Name
- Description
- An emoji or icon

### New Quiz Question

Add questions to the location's `activities` array:

- Question text (age-appropriate versions)
- Four answer options
- Correct answer index
- Explanation for feedback

## Accessibility Guidelines

We're committed to making this game accessible to all learners:

- All interactive elements must be keyboard navigable
- Images need descriptive alt text
- Use semantic HTML elements
- Ensure sufficient color contrast (4.5:1 minimum, 7:1 preferred)
- Support reduced motion preferences
- Test with screen readers

## Questions?

- Open a [GitHub Discussion](https://github.com/baytides/tide-pool-kids/discussions) for questions
- Check existing issues before creating new ones
- Reach out to the Bay Tides team at [baytides.org/contact](https://baytides.org/contact)

## Code of Conduct

Be kind, respectful, and constructive. We're building something for kids, and we want our community to reflect the positive values we're teaching.

Thank you for helping make environmental education fun and accessible!
