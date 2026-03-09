import { useState } from 'react';
import { Search, MapPin, Clock, Phone, Navigation, ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

interface PontoColeta {
  id: number;
  name: string;
  address: string;
  distance: string;
  hours: string;
  phone: string;
  materials: string[];
  type: 'ecoponto' | 'supermercado' | 'posto' | 'escola';
}

export function Consulta() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [showMap, setShowMap] = useState(false);

  const pontosColeta: PontoColeta[] = [
    {
      id: 1,
      name: "Ecoponto Centro",
      address: "Rua das Flores, 123 - Centro",
      distance: "0.8 km",
      hours: "Seg-Sex: 8h-18h | Sáb: 8h-12h",
      phone: "(11) 3456-7890",
      materials: ["Papel", "Plástico", "Vidro", "Metal"],
      type: "ecoponto"
    },
    {
      id: 2,
      name: "Supermercado VerdeVida",
      address: "Avenida Principal, 456 - Jardins",
      distance: "1.2 km",
      hours: "Todos os dias: 7h-22h",
      phone: "(11) 2345-6789",
      materials: ["Plástico", "Papel", "Vidro"],
      type: "supermercado"
    },
    {
      id: 3,
      name: "Posto de Coleta Municipal",
      address: "Rua dos Eucaliptos, 789 - Vila Nova",
      distance: "2.1 km",
      hours: "Seg-Sex: 7h-17h",
      phone: "(11) 1234-5678",
      materials: ["Eletrônicos", "Baterias", "Óleo", "Papel"],
      type: "posto"
    },
    {
      id: 4,
      name: "Escola Municipal Sustentável",
      address: "Rua da Educação, 321 - Centro",
      distance: "1.5 km",
      hours: "Seg-Sex: 8h-17h (período letivo)",
      phone: "(11) 3456-1234",
      materials: ["Papel", "Plástico", "Metal"],
      type: "escola"
    },
    {
      id: 5,
      name: "Ecoponto Norte",
      address: "Avenida Contorno, 999 - Norte",
      distance: "3.2 km",
      hours: "Seg-Sex: 8h-18h | Sáb: 8h-14h",
      phone: "(11) 9876-5432",
      materials: ["Todos os materiais"],
      type: "ecoponto"
    }
  ];

  const typeColors = {
    ecoponto: "bg-green-100 text-green-800",
    supermercado: "bg-blue-100 text-blue-800",
    posto: "bg-yellow-100 text-yellow-800",
    escola: "bg-purple-100 text-purple-800"
  };

  const typeLabels = {
    ecoponto: "Ecoponto",
    supermercado: "Supermercado",
    posto: "Posto Municipal",
    escola: "Escola"
  };

  const filteredPontos = pontosColeta.filter(ponto => {
    const matchesSearch = ponto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ponto.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'todos' || ponto.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getDirections = (address: string) => {
    toast.success(`Abrindo mapa para: ${address}`, {
      icon: '🗺️',
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Início
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Search className="w-8 h-8 text-green-600" />
          Pontos de Coleta
        </h1>
        <p className="text-gray-600 mt-2">
          Encontre locais adequados para descarte de materiais recicláveis
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="todos">Todos os tipos</option>
              <option value="ecoponto">Ecopontos</option>
              <option value="supermercado">Supermercados</option>
              <option value="posto">Postos Municipais</option>
              <option value="escola">Escolas</option>
            </select>
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="bg-gray-100 rounded-lg p-8 mb-6 text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Mapa interativo seria exibido aqui</p>
          <p className="text-sm text-gray-500 mt-2">Mostrando {filteredPontos.length} pontos de coleta próximos</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPontos.map(ponto => (
          <div key={ponto.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{ponto.name}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${typeColors[ponto.type]} mt-1`}>
                  {typeLabels[ponto.type]}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-600 font-medium">
                  <MapPin className="w-4 h-4" />
                  {ponto.distance}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{ponto.address}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{ponto.hours}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{ponto.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium text-gray-700 mb-2">Materiais aceitos:</p>
              <div className="flex flex-wrap gap-1">
                {ponto.materials.map((material, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => getDirections(ponto.address)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Como Chegar
              </button>
              <button
                onClick={() => toast(`Ligando para ${ponto.phone}`, {
                  icon: '📞',
                  duration: 2000,
                })}
                className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPontos.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum ponto de coleta encontrado</p>
          <p className="text-sm text-gray-400 mt-2">Tente ajustar sua busca ou filtros</p>
        </div>
      )}
    </div>
  );
}
