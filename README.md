### React + TypeScript + Vite
# Resume Optimizer - Frontend

This is the frontend of the **Resume Optimizer** app, a system designed to optimize resumes based on job descriptions using artificial intelligence. The app allows users to upload their CV in Markdown and receive an enhanced version based on a specific job position.

**Technologies used:**
- React 19 with TypeScript
- Vite (for fast and efficient development)
- TailwindCSS (coming soon)
- Communication with FastAPI + Celery on the backend

---

## Installation and Configuration

### 1. Clone the repository
```bash
git clone https://github.com/tatooin6/resume-optimizer-frontend.git resume_optimizer_frontend
cd resume_optimizer_frontend
```
### 2. Install the dependencies
```bash
npm install
```

### 3. Start the development environment
```bash
npm run dev
```

This will run the development server at http://localhost:5173/

---

## Available commands

| Command           | Description                                  |
|-------------------|----------------------------------------------|
| `npm run dev`     | Start the development server with Vite.      |
| `npm run build`   | Build the application for production.        |
| `npm run preview` | Preview the production version locally.      |
| `npm run lint`    | Runs ESLint to check for errors in the code. |

___

## Project Structure

The structure follows Atomic Design, organizing the components in hierarchical levels:

```
src/
│── components/     # Reusable components
│   ├── atoms/      # Basic elements (Button, Input)
│   ├── molecules/  # Atom combinations (Form)
│   ├── organisms/  # Complete sections (Card, Navbar)
│   ├── templates/  # Base layouts
│── pages/          # Main app views
│── services/       # Backend API calls
│── hooks/          # Custom hooks
│── contexts/       # Global state management
│── styles/         # Style files (Tailwind)
│── App.tsx         # Main entry point
│── main.tsx        # Render the app
```

___

## Backend Connection

The frontend communicates with the [backend project](https://github.com/tatooin6/resume_optimization) developed in FastAPI + Celery. For it to work correctly, you must have the backend running on http://localhost:8000/.

#### Upcoming improvements:
- TailwindCSS integration.
- Converting PDF to Markdown before sending to the backend.
- OCR integration for Job Description input.
- Using WebSockets to track processing.
- Dockerization with backend container.

___

## License

This project is licensed under the MIT License.
