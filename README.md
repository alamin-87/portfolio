# MD. AL-AMIN Portfolio Client

This is a professional, high-fidelity portfolio website built with **React**, **Vite**, and **Tailwind CSS**. Designed for a premium user experience, it features advanced 3D animations, smooth scrolling, parallax effects, and glassmorphism styling to brilliantly showcase my projects, skills, education, and professional experience as a Full Stack Developer.

## 🚀 Features

- **Dynamic Hero Section:** Immersive 3D-inspired user interface with a tech stack orbit animation.
- **Advanced Animations:** Utilizes Framer Motion and GSAP for fluid text reveals, micro-animations, and particle effects.
- **Premium User Experience:** Implements smooth scrolling with Lenis, an interactive custom cursor, and magnetic buttons.
- **Modern Responsive Design:** Completely mobile-optimized with sophisticated glassmorphism UI elements and responsive layouts.
- **Interactive Showcases:** Project showcase featuring live demos and GitHub links, along with detailed skills and education sections.
- **Contact Integration:** Seamless contact form fully integrated with a backend server setup.
- **Theme Flexibility:** Built-in theme toggle for dynamic light/dark modes.

## 🛠️ Tech Stack

**Core Frameworks & Libraries:**
- [React](https://react.dev/) (v19)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (v4)
- [React Router](https://reactrouter.com/)

**3D & Animations:**
- [Framer Motion](https://www.framer.com/motion/) (UI Animations)
- [GSAP](https://gsap.com/) (Scroll & Advanced Animations)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei) (3D rendering)
- [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)

**UI & Icons:**
- [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- [DaisyUI](https://daisyui.com/)
- [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) (Utility UI classes)

**Forms & Utilities:**
- [EmailJS](https://www.emailjs.com/) (Contact form fallback integration)
- [Axios](https://axios-http.com/) (API calls to the backend server)

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alamin-87/portfolio.git
   cd portfolio/portfolio-client-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Directory Structure

```text
src/
  ├── assets/           # Images, 3D models, and static files
  ├── components/       # Reusable UI components
  │     ├── CustomCursor.jsx
  │     ├── MagneticButton.jsx
  │     ├── Navbar.jsx
  │     ├── ParallaxSection.jsx
  │     ├── ParticleField.jsx
  │     ├── TextReveal.jsx
  │     └── ThemeToggle.jsx
  ├── hooks/            # Custom React hooks
  ├── lib/              # Utility functions
  ├── portfolio/        # Main page sections
  │     ├── About.jsx
  │     ├── Contact.jsx
  │     ├── Education.jsx
  │     ├── Footer.jsx
  │     ├── Hero.jsx
  │     ├── Portfolio.jsx
  │     ├── Projects.jsx
  │     └── Skills.jsx
  ├── App.jsx           # Application shell & routing
  ├── index.css         # Global styles
  └── main.jsx          # App entry point
```

## 🔗 Related Structure
The backend REST API server corresponding to this client interface is located within the `portfolio-server-site` directory.

## 📧 Contact

- **Email:** alamin.rahman87@gmail.com
- **LinkedIn:** [MD. AL-AMIN](https://www.linkedin.com/in/alamin-rahman87/)
- **GitHub:** [alamin-87](https://github.com/alamin-87)

---

© 2024 MD. AL-AMIN. All rights reserved.
