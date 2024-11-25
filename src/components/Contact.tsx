import { Phone, Mail, MapPin, Clock } from 'lucide-react';

function Contact() {
  return (
    <section id="contact" className="py-20 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contactez-Nous</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous sommes à votre disposition pour répondre à toutes vos questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <form className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Tel</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Sujet</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>
              <button className="w-full bg-pink-700 text-white py-3 rounded-md hover:bg-pink-800 transition-colors">
                Envoyer le message
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Informations de Contact</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-pink-700 mr-4" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-gray-600">+221 XX XXX XX XX</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-pink-700 mr-4" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">contact@smsj-school.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-pink-700 mr-4" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-600">Dakar, Sénégal</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-pink-700 mr-4" />
                <div>
                  <p className="font-medium">Horaires d'ouverture</p>
                  <p className="text-gray-600">Lun - Ven: 8h00 - 17h00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;