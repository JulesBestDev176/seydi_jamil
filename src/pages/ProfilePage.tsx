import  { useState, FormEvent } from 'react';
import { User, UserPlus, Save } from 'lucide-react';

// Types
interface ProfileFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
}

interface NewUserData {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'admin';
}

// ProfilePage Component
export const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      // API call placeholder
      // const response = await fetch('/api/profile/update', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(formData)
      // });

      setSuccess('Profil mis à jour avec succès');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        email: '',
      });
    } catch (error) {
      setError('Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
        <div className="flex items-center justify-center mb-6">
          <User className="h-12 w-12 text-pink-700" />
          <h1 className="text-2xl font-bold ml-2">Modifier mon profil</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Mot de passe actuel</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Nouveau mot de passe</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-pink-700 text-white py-2 px-4 rounded-md hover:bg-pink-800 flex items-center justify-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

// AddUserPage Component
export const AddUserPage: React.FC = () => {
  const [formData, setFormData] = useState<NewUserData>({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      // API call placeholder
      // const response = await fetch('/api/users/add', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(formData)
      // });

      setSuccess('Utilisateur ajouté avec succès');
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      });
    } catch (error) {
      setError('Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
        <div className="flex items-center justify-center mb-6">
          <UserPlus className="h-12 w-12 text-pink-700" />
          <h1 className="text-2xl font-bold ml-2">Ajouter un utilisateur</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Rôle</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value as 'user' | 'admin'})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Confirmer le mot de passe</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-pink-700 text-white py-2 px-4 rounded-md hover:bg-pink-800 flex items-center justify-center"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Ajouter l'utilisateur
          </button>
        </form>
      </div>
    </div>
  );
};

export default {
  ProfilePage,
  AddUserPage,
};