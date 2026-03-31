# D Sky Ventures Pvt Ltd - Premium IT Company Website

A highly advanced, modern, interactive website for D Sky Ventures Pvt Ltd featuring premium animations, 3D effects, multi-page navigation, and a full backend API.

![Website Preview](https://uhpgbjdvyqd5s.ok.kimi.link)

## Features

### Frontend
- **Multi-Page Navigation**: React Router with smooth animated page transitions
- **Advanced Animations**: GSAP + Framer Motion for scroll-triggered and hover animations
- **3D Effects**: Three.js particle system with interactive background
- **Custom Cursor**: Animated cursor with hover detection
- **Loader Animation**: Stylish loading screen with logo animation
- **Scroll Progress**: Visual progress indicator
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Pages
1. **Home**: Fullscreen hero with 3D particles, stats counter, services preview, CTA
2. **About**: Company story, values, team section with animations
3. **Services**: 8 service categories with 3D tilt card effects
4. **Service Detail**: Individual service pages with process workflow
5. **Portfolio**: Project showcase with filter categories
6. **Project Detail**: Detailed project case studies
7. **Contact**: Functional contact form with backend integration

### Backend
- **Node.js + Express**: RESTful API
- **MongoDB**: Database for contact form submissions
- **CORS**: Cross-origin resource sharing enabled
- **Endpoints**:
  - `POST /api/contact` - Submit contact form
  - `GET /api/contacts` - Retrieve all contacts
  - `POST /api/newsletter` - Newsletter subscription
  - `GET /api/stats` - Get submission statistics
  - `GET /api/health` - Health check

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite 7 (Build tool)
- Tailwind CSS 3.4
- Framer Motion (Animations)
- GSAP + ScrollTrigger (Scroll animations)
- Three.js + React Three Fiber (3D graphics)
- React Router (Navigation)
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- dotenv

## Project Structure

```
/
├── app/                    # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Loader.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── FloatingOrbs.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── ServiceDetail.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── ProjectDetail.tsx
│   │   │   └── Contact.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/images/      # Static images
│   ├── dist/               # Build output
│   └── package.json
│
├── server/                 # Backend Node.js application
│   ├── server.js           # Main server file
│   ├── .env                # Environment variables
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)

### Frontend Setup

```bash
cd app
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dskyventures
```

Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Build for Production

```bash
cd app
npm run build
```

The build output will be in `app/dist/`

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

## Design Features

### Color System
- Primary: Pink (#ff73c3)
- Background: Black (#000000)
- Text: White (#ffffff)
- Gradients: Pink → Purple → Cyan variations

### Typography
- Display: Montserrat (900 weight)
- Body: Open Sans (300-800 weight)

### Animations
- Page transitions with overlay effects
- Scroll-triggered reveals
- 3D card tilt on hover
- Floating orbs background
- Particle system with mouse interaction
- Counter animations for statistics

## API Documentation

### Contact Form Submission
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Inc",
  "service": "Web Development",
  "message": "I need a new website"
}
```

### Newsletter Subscription
```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

## Performance Optimizations

- Lazy loading for images
- Code splitting with dynamic imports
- Optimized 3D rendering with Three.js
- CSS animations for smooth performance
- Reduced motion support for accessibility

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2024 D Sky Ventures Pvt Ltd. All rights reserved.

---

Built with passion by the D Sky Ventures team.
