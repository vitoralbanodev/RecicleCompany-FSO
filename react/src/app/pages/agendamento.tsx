import { useState } from 'react';
import { Calendar, Clock, MapPin, Recycle, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import api from '../services/api';

export function Agendamento() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    materials: [] as string[],
    observations: ''
  });

  const materials = [
    'Papel e Papelão',
    'Plástico',
    'Vidro',
    'Metal',
    'Eletrônicos',
    'Baterias e Pilhas',
    'Óleo de Cozinha',
    'Orgânicos'
  ];

  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '14:00 - 16:00',
    '16:00 - 18:00'
  ];

  const handleMaterialToggle = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log('Agendamento:', formData);
    
    if (!formData.date || !formData.time || formData.materials.length === 0) {
      toast.error('Por favor, preencha todos os campos obrigatórios e selecione pelo menos um material.');
      return;
    }

    toast.loading('Processando agendamento...');

    await api.post('/schedule', formData).then((response) => {
      console.log('response', response);
      
      toast.success('Agendamento realizado com sucesso!');

      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        materials: [] as string[],
        observations: ''
      });
    }).catch(() => {
      toast.error('Erro ao realizar agendamento.');
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
          <Calendar className="w-8 h-8 text-green-600" />
          Agendar Coleta
        </h1>
        <p className="text-gray-600 mt-2">
          Agende a coleta de materiais recicláveis em sua residência ou empresa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Informações Pessoais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Data e Horário</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data da Coleta</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Período Desejado</label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Selecione um horário</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Materiais para Coleta</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {materials.map(material => (
                  <label
                    key={material}
                    className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.materials.includes(material)}
                      onChange={() => handleMaterialToggle(material)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm">{material}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações Adicionais</label>
              <textarea
                value={formData.observations}
                onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Informações adicionais sobre a coleta..."
              />
            </section>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Agendar Coleta
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Informações Importantes
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• A coleta será realizada no período selecionado</li>
              <li>• Separe os materiais corretamente antes da coleta</li>
              <li>• Tenha os materiais prontos 30 minutos antes</li>
              <li>• Entraremos em contato para confirmar o agendamento</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Recycle className="w-5 h-5 text-blue-600" />
              Materiais Aceitos
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Papel, papelão e embalagens</li>
              <li>• Plásticos recicláveis (PET, PEAD, PP)</li>
              <li>• Vidro (garrafas, potes, frascos)</li>
              <li>• Metais (latas, alumínio, ferro)</li>
              <li>• Eletrônicos pequenos</li>
              <li>• Baterias e pilhas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
