# Rad-Lab Research & Surveys - Coming Soon Page

A coming soon page for Rad-Lab Research & Surveys, featuring an interactive uranium decay chain animation.

## Deployment on Cloudflare

This project is configured to be deployed on Cloudflare Pages with Workers integration.

### Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. In the Cloudflare Dashboard:
   - Go to Pages
   - Create a new project
   - Connect your Git repository
   - Configure the build settings:
     - Build command: `npm run build`
     - Build output directory: `out`
   - Deploy

3. For the Worker functionality:
   - In the Pages project settings, go to Functions
   - Enable Functions
   - The `_worker.js` file will be automatically detected and used

## Local Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
\`\`\`

## Technologies Used

- Next.js
- React
- Tailwind CSS
- TypeScript
- HTML Canvas for animations
