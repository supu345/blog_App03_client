import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import DetailsPage from "./pages/DetailsPage";
import CategoryNewsPage from "./pages/CategoryNewsPage";
import AuthorsPage from "./pages/AuthorsPage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/news/:slug" element={<DetailsPage />} />
        <Route path="/search/news?" element={<SearchPage />} />
        <Route
          path="/category/news/:category"
          element={
            <>
              <CategoryNewsPage />
            </>
          }
          caseSensitive={true}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
