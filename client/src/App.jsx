import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import ReadingListPage from "./pages/ReadingListPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { ReadingListProvider } from "./context/ReadingListContext.jsx";
import SpaceBookingPage from "./pages/SpaceBookingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <ReadingListProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/reading-list" element={<ReadingListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/space-booking"
          element={
            <ProtectedRoute>
              <SpaceBookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ReadingListProvider>
  );
}

export default App;
