import { useState, useEffect } from 'react';
import { AlertTriangle, Camera, MapPin, FileText, ArrowLeft, Check, Search, Filter, Eye } from 'lucide-react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import api from '../services/api';


export function Denuncia() {
  const [activeTab, setActiveTab] = useState<'form' | 'consult'>('form');
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    date: '',
    time: '',
    photos: [] as string[],
    anonymous: false,
    name: '',
    email: '',
    phone: ''
  });
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const denunciaTypes = [
    'Descarte irregular de lixo',
    'Lixão clandestino',
    'Queima de lixo a céu aberto',
    'Lançamento de resíduos em córregos',
    'Entulho em via pública',
    'Outros'
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

  const resizeImage = (file: File, maxWidth: number = 800, maxHeight: number = 600, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);

        const base64 = canvas.toDataURL('image/jpeg', quality);
        resolve(base64);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentCount = formData.photos.length;
    const newFiles = files.slice(0, 3 - currentCount);
    
    if (newFiles.length === 0 && currentCount >= 3) {
      toast.error('Limite máximo de 3 fotos atingido.');
      return;
    }
    
    const photoPromises = newFiles.map(file => resizeImage(file));
    
    try {
      const base64Photos = await Promise.all(photoPromises);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...base64Photos]
      }));
      
      if (newFiles.length > 0) {
        toast.success(`${newFiles.length} foto(s) adicionada(s)`, {
          icon: '📷',
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error('Erro ao processar fotos.');
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.type || !formData.description || !formData.location) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    toast.loading('Registrando denúncia...');

    await api.post('/complaint', formData).then((response) => {
      const protocol = response.data.protocol;
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
        photos: [] as string[],
        anonymous: false,
        name: '',
        email: '',
        phone: ''
      });
    }).catch(() => {
      toast.error('Erro ao registrar denúncia.');
    });
  };

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await api.get('/complaint');
      setComplaints(response.data);
      toast.success('Denúncias carregadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao carregar denúncias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'consult') {
      fetchComplaints();
    }
  }, [activeTab]);

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

      <div className="mb-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'form'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Nova Denúncia
          </button>
          <button
            onClick={() => setActiveTab('consult')}
            className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'consult'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Search className="w-4 h-4" />
            Consultar Denúncias
          </button>
        </div>
      </div>

      {activeTab === 'form' ? (
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
                        src={photo}
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
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Denúncias Registradas</h2>
            <button
              onClick={fetchComplaints}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Carregando...' : 'Atualizar'}
            </button>
          </div>

          {complaints.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma denúncia encontrada.</p>
              <p className="text-sm text-gray-400 mt-2">As denúncias aparecerão aqui quando forem registradas.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Protocolo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Descrição</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Local</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-medium">{complaint.protocol}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{complaint.type}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600 line-clamp-2">{complaint.description}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{complaint.location}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{complaint.date}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${statusColors[complaint.status as keyof typeof statusColors]}`}>
                          {statusLabels[complaint.status as keyof typeof statusLabels]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
