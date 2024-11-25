import React from 'react';
import { Shield, Heart, Trophy, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Environnement Sécurisé',
    description: 'Campus surveillé et sécurisé pour la tranquillité des parents et des élèves.'
  },
  {
    icon: Heart,
    title: 'Accompagnement Personnalisé',
    description: 'Suivi individuel et soutien adapté aux besoins de chaque élève.'
  },
  {
    icon: Trophy,
    title: 'Excellence Académique',
    description: 'Programme rigoureux visant les meilleurs résultats scolaires.'
  },
  {
    icon: BookOpen,
    title: 'Activités Parascolaires',
    description: 'Large choix d\'activités sportives et culturelles pour un développement complet.'
  }
];

function Features() {
  return (
    <section id="features" className="py-20 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi Nous Choisir</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Notre école s'engage à fournir une éducation de qualité dans un environnement stimulant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-pink-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;