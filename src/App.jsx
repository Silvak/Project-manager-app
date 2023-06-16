import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  );
}

export default App;
