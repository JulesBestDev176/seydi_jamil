import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetchAppointments();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setAppointments(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des rendez-vous');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/appointments/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      fetchAppointments();
      toast.success('Statut mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 mt-16">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {appointment.name}
                  </h3>
                  <p className="text-sm text-gray-500">{appointment.email}</p>
                  <p className="text-sm text-gray-500">{appointment.phone}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(appointment.date).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {appointment.message}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={appointment.status}
                    onChange={(e) =>
                      handleStatusChange(appointment._id, e.target.value)
                    }
                    className="rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {appointment.status === 'confirmed'
                      ? 'Confirmé'
                      : appointment.status === 'cancelled'
                      ? 'Annulé'
                      : 'En attente'}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;