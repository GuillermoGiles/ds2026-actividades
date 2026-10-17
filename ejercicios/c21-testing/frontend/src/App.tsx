import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import { LibroNuevo } from './pages/LibroNuevo';
import { Login } from './pages/Login';
import { SinPermiso } from './pages/SinPermiso';

function App() {
  return (
    // El Provider va por encima de todo lo que lo consume: el Header (dentro de Layout) usa useAuth()
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />

          {/* Solo ADMIN: layout route sin path, la hija se renderiza en el <Outlet /> de PrivateRoute */}
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
