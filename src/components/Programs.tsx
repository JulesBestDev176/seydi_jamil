import React from 'react';
import { BookOpen, Users, Lightbulb, Award } from 'lucide-react';

const programs = [
  {
    title: "Jardin d'Enfants",
    description: "Un environnement nurturant pour les 3-5 ans, favorisant la découverte et la créativité.",
    icon: Users,
    age: "3-5 ans"
  },
  {
    title: "École Élémentaire",
    description: "Formation fondamentale solide avec un accent sur les compétences essentielles.",
    icon: BookOpen,
    age: "6-11 ans"
  },
  {
    title: "Collège",
    description: "Programme enrichi développant l'esprit critique et l'autonomie.",
    icon: Lightbulb,
    age: "12-15 ans"
  },
  {
    title: "Lycée",
    description: "Préparation approfondie pour l'enseignement supérieur et la réussite future.",
    icon: Award,
    age: "16-18 ans"
  }
];

function Programs() {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Programmes Éducatifs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une approche complète de l'éducation, adaptée à chaque niveau de développement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <program.icon className="h-6 w-6 text-pink-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
              <p className="text-sm text-pink-700 mb-3">{program.age}</p>
              <p className="text-gray-600">{program.description}</p>
              <button className="mt-4 text-pink-700 hover:text-pink-800 font-medium">
                En savoir plus →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;