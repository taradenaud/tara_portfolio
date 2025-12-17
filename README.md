# Tara Denaud | Software Developer Portfolio

A portfolio website showcasing my journey as a Computer Science student and software developer. Built with React and featuring animations and an immersive 3D star background.

🌐 **Live Site:** [taradenaud.com](https://taradenaud.com)

## 🎨 Color Story

The portfolio features a **night-sky-inspired color palette**:

### Deep Blues (Background & Structure)
The foundation uses a gradient of deep blues that create a sense of depth:
- **Rich Black** `#000814` - The cosmic void, providing maximum contrast
- **Oxford Blue** `#001d3d` - Deep space background
- **Yale Blue** `#003566` - Mid-tone backgrounds and secondary elements
- **Marian Blue** `#00428b` - Accent backgrounds and hover states

### Golden Yellows (Highlights & Interaction)
Warm yellow tones guiding users through the experience:
- **Mikado Yellow** `#ffc300` - Primary accents, borders, and active states
- **Gold Yellow** `#ffd60a` - Interactive elements and hover effects
- **Maize Yellow** `#fbec5d` - Text highlights and bright accents

This palette creates a **high-contrast, accessible design** that's both visually striking and easy to read, while maintaining a cohesive theme throughout.

### Color Palette Reference

| Color          | Hex                                                                  | Usage |
| -------------- | -------------------------------------------------------------------- | ----- |
| Rich Black     | ![#000814](https://via.placeholder.com/10/000814?text=+) `#000814`   | Deep backgrounds |
| Oxford Blue    | ![#001d3d](https://via.placeholder.com/10/001d3d?text=+) `#001d3d`   | Card backgrounds |
| Yale Blue      | ![#003566](https://via.placeholder.com/10/003566?text=+) `#003566`   | Secondary elements |
| Marian Blue    | ![#00428b](https://via.placeholder.com/10/00428b?text=+) `#00428b`   | Hover states |
| Mikado Yellow  | ![#ffc300](https://via.placeholder.com/10/ffc300?text=+) `#ffc300`   | Primary accents |
| Gold Yellow    | ![#ffd60a](https://via.placeholder.com/10/ffd60a?text=+) `#ffd60a`   | Interactive elements |
| Maize Yellow   | ![#fbec5d](https://via.placeholder.com/10/fbec5d?text=+) `#fbec5d`   | Text highlights |

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/taradenaud/tara_portfolio.git
   cd tara_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will automatically open at [http://localhost:3000](http://localhost:3000)
   - Hot reload is enabled for development

### Build for Production

```bash
npm run build
```
Creates an optimized production build in the `build/` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```
Deploys the built site to GitHub Pages (configured in `package.json`).

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - Component-based UI framework
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Custom styling with CSS variables and animations
- **Sass 1.83.0** - For enhanced styling

### Animation & 3D
- **GSAP 3.12.5** - Animation library
  - ScrollTrigger - Scroll-based animations
  - TextPlugin - Typewriter effects
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers for React Three Fiber
- **Three.js** - 3D animated star background

### UI Components & Icons
- **react-icons** - Professional icon library (FontAwesome)
- **@fortawesome/react-fontawesome 0.2.2** - Social media icons
- **@fortawesome/free-brands-svg-icons 6.6.0** - Brand icons

### Development Tools
- **Create React App** - Build tooling and configuration
- **gh-pages 6.2.0** - GitHub Pages deployment

### Additional Libraries
- **react-slick** - Carousel/slider functionality (legacy)
- **IntersectionObserver API** - Scroll-based section detection

## Features

- **Responsive Design** - Mobile, tablet, and desktop optimized with hamburger menu
- **Collapsible Sections** - Experience and Community sections for better content organization
- **Modal Overlays** - Expandable cards for detailed information
- **Smooth Scrolling** - Navbar navigation with animated indicators
- **Accessibility** - High contrast ratios and semantic HTML
- **Languages** - Will add French/English website translation soon.

