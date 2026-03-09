import { useState } from 'react';
import { AlertTriangle, Camera, MapPin, FileText, ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

interface Denuncia {
  id: number;
  type: string;
  description: string;
  location: string;
  date: string;
  status: 'pending' | 'resolved' | 'investigating';
  protocol: string;
}

export function Denuncia() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    date: '',
    time: '',
    photos: [] as File[],
    anonymous: false,
    name: '',
    email: '',
    phone: ''
  });

  const [showHistory, setShowHistory] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const denunciaTypes = [
    'Descarte irregular de lixo',
    'Lixão clandestino',
    'Queima de lixo a céu aberto',
    'Lançamento de resíduos em córregos',
    'Entulho em via pública',
    'Outros'
  ];

  const mockDenuncias: Denuncia[] = [
    {
      id: 1,
      type: 'Descarte irregular de lixo',
      description: 'Grande quantidade de lixo doméstico acumulada na calçada',
      location: 'Rua das Flores, 123',
      date: '2024-03-08',
      status: 'investigating',
      protocol: 'DEN-2024-001'
    },
    {
      id: 2,
      type: 'Lixão clandestino',
      description: 'Área com entulhos e resíduos de construção',
      location: 'Avenida Principal, 456',
      date: '2024-03-07',
      status: 'pending',
      protocol: 'DEN-2024-002'
    }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    investigating: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    pending: 'Aguardando',
    investigating: 'Em Investigação',
    resolved: 'Resolvido'
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentCount = formData.photos.length;
    const newFiles = files.slice(0, 3 - currentCount);
    
    if (newFiles.length === 0 && currentCount >= 3) {
      toast.error('Limite máximo de 3 fotos atingido.');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newFiles]
    }));
    
    if (newFiles.length > 0) {
      toast.success(`${newFiles.length} foto(s) adicionada(s)`, {
        icon: '📷',
        duration: 2000,
      });
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    toast('Foto removida', {
      icon: '🗑️',
      duration: 2000,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.description || !formData.location) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    const protocol = `DEN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    toast.loading('Registrando denúncia...');
    
    setTimeout(() => {
      toast.success(`Denúncia registrada com sucesso!\nProtocolo: ${protocol}`, {
        duration: 6000,
        icon: '🚨',
      });
      
      setFormData({
        type: '',
        description: '',
        location: '',
        date: '',
        time: '',
        photos: [],
        anonymous: false,
        name: '',
        email: '',
        phone: ''
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Início
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          Fazer Denúncia
        </h1>
        <p className="text-gray-600 mt-2">
          Reporte descarte irregular e ajude a manter a cidade limpa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tipo de Infração</h2>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Selecione o tipo de denúncia</option>
                {denunciaTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Descrição Detalhada</h2>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Descreva detalhadamente o que você observou..."
              />
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Localização</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Rua, número, bairro..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data da Ocorrência</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Fotos (Opcional)</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-3">Adicione até 3 fotos para comprovar a denúncia</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                >
                  Adicionar Fotos
                </label>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
                  Fazer denúncia anônima
                </label>
              </div>

              {!formData.anonymous && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              )}
            </section>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Enviar Denúncia
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-red-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Importante
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Forneça informações precisas e detalhadas</li>
              <li>• Fotos ajudam na comprovação</li>
              <li>• Denúncias falsas são crime</li>
              <li>• Você receberá um protocolo para acompanhamento</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Acompanhamento
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Acompanhe o status da sua denúncia pelo protocolo gerado.
            </p>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showHistory ? 'Ocultar' : 'Ver'} Minhas Denúncias
            </button>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Resultados Esperados
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Fiscalização no local</li>
              <li>• Autuação dos responsáveis</li>
              <li>• Limpeza da área</li>
              <li>• Medidas educativas</li>
            </ul>
          </div>
        </div>
      </div>

      {showHistory && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Minhas Denúncias</h2>
          <div className="space-y-4">
            {mockDenuncias.map(denuncia => (
              <div key={denuncia.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{denuncia.type}</h3>
                    <p className="text-sm text-gray-600">Protocolo: {denuncia.protocol}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[denuncia.status]}`}>
                    {statusLabels[denuncia.status]}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{denuncia.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {denuncia.location}
                  </span>
                  <span>{denuncia.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
