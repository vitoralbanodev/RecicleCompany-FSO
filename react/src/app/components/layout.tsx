import { Outlet, Link, useLocation } from 'react-router';
import { Home, Calendar, Search, AlertTriangle } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/agendamento', icon: Calendar, label: 'Agendar' },
    { path: '/consulta', icon: Search, label: 'Pontos' },
    { path: '/denuncia', icon: AlertTriangle, label: 'Denúncia' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Recicle Company</h1>
          <p className="text-sm text-green-100">Sistema Inteligente de Gestão de Resíduos</p>
        </div>
      </header>

      <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-green-600 text-green-600 font-medium'
                      : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm">
            <p>&copy; 2026 Recicle Company</p>
            <p className="text-gray-400 mt-1">
              Contribuindo para um ambiente urbano mais limpo e sustentável
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
