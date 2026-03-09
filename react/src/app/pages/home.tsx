import { Link } from 'react-router';
import { 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  Recycle, 
  Leaf, 
  ShieldCheck,
  Trash2,
  Clock,
  Search,
  FileText,
  ChevronRight
} from 'lucide-react';

export function Home() {
  const recyclingTips = [
    {
      icon: <Recycle className="w-8 h-8 text-green-600" />,
      title: "Separe os Materiais",
      description: "Plástico, papel, vidro e metal devem ser separados em recipientes diferentes para facilitar o processo de reciclagem.",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Leaf className="w-8 h-8 text-blue-600" />,
      title: "Limpem os Recipientes",
      description: "Antes de descartar, limpe bem as embalagens para remover resíduos de alimentos e líquidos.",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-yellow-600" />,
      title: "Verifique os Símbolos",
      description: "Procure pelos símbolos de reciclagem nas embalagens para identificar o tipo de material e como descartá-lo corretamente.",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      icon: <Trash2 className="w-8 h-8 text-red-600" />,
      title: "Descarte Eletrônicos",
      description: "Pilhas, baterias e equipamentos eletrônicos devem ser levados a pontos de coleta específicos.",
      color: "bg-red-50 border-red-200"
    }
  ];

  const services = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Agendar Coleta",
      description: "Agende a coleta de materiais recicláveis em sua residência ou empresa",
      path: "/agendamento",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Consultar Pontos",
      description: "Encontre locais de descarte próximo à sua localização",
      path: "/consulta",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Fazer Denúncia",
      description: "Reporte descarte irregular e ajude a manter a cidade limpa",
      path: "/denuncia",
      color: "bg-red-600 hover:bg-red-700"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg text-white p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            Descarte de Forma Consciente e Responsável
          </h1>
          <p className="text-lg text-green-50 mb-8">
            Contribua para um ambiente urbano mais limpo. Encontre locais adequados para descarte,
            agende coletas e ajude a combater o descarte irregular.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className={`${service.color} text-white rounded-lg p-4 flex items-center justify-between transition-all transform hover:scale-105 shadow-lg`}
              >
                <div className="flex items-center gap-3">
                  {service.icon}
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm opacity-90">{service.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          Dicas de Reciclagem
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recyclingTips.map((tip, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 ${tip.color} transition-all hover:shadow-md`}
            >
              <div className="mb-3">{tip.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Nosso Impacto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600 mb-1">2.5t</div>
            <p className="text-gray-600">Materiais reciclados este mês</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-1">150+</div>
            <p className="text-gray-600">Pontos de coleta ativos</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600 mb-1">85%</div>
            <p className="text-gray-600">Redução de resíduos</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Junte-se ao Movimento!
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Cada pequena ação faz a diferença. Comece hoje mesmo a separar seus resíduos 
          e contribua para um futuro mais sustentável.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/agendamento"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Começar Agora
          </Link>
          <Link
            to="/consulta"
            className="bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Ver Pontos de Coleta
          </Link>
        </div>
      </section>
    </div>
  );
}
