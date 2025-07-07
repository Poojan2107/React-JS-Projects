## TaskMaster: Local Storage CRUD React App

TaskMaster is a simple and elegant task management application built with React, Vite, and Bootstrap. It allows users to add, edit, delete, and mark tasks as completed, with all data persisted in the browser's local storage.

### Features

- **Add Tasks:** Create new tasks with a title and optional description.
- **Edit Tasks:** Update existing tasks easily.
- **Delete Tasks:** Remove tasks with a confirmation prompt.
- **Mark as Completed:** Toggle tasks between pending and completed states.
- **Persistent Storage:** All tasks are saved in local storage, so your data remains even after refreshing or closing the browser.
- **Responsive UI:** Clean and modern interface using Bootstrap and React Icons.

### Screenshots

![TaskMaster Screenshot](public/vite.svg)

### Getting Started

#### Prerequisites
- Node.js (v16 or above recommended)
- npm or yarn

#### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd local-storage-crud
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

### Project Structure

- `src/App.jsx` - Main application logic and UI
- `src/App.css` - Custom styles
- `public/` - Static assets
- `index.html` - Main HTML file

### Dependencies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [react-hook-form](https://react-hook-form.com/)
- [uuid](https://www.npmjs.com/package/uuid)
- [react-icons](https://react-icons.github.io/react-icons/)

### Customization

You can further customize the app by editing `src/App.jsx` and `src/App.css` to fit your needs.

### License

This project is open source and available under the [MIT License](LICENSE).

---
**TaskMaster** – Organize your life, one task at a time!
