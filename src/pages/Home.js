import { ProtectedRoute } from "../components";
const Home = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>home</h1>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
