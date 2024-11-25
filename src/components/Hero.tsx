import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section id="home" className="pt-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bienvenue à l'École
              <span className="text-pink-700 block">Seydi Moustapha Sy Jamil</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Une éducation d'excellence de la maternelle au lycée, formant les leaders de demain.
            </p>
            <div className="space-x-4">
              <button className="bg-pink-700 text-white px-6 py-3 rounded-md hover:bg-pink-800">
                Découvrir nos programmes
              </button>
              <button className="border-2 border-pink-700 text-pink-700 px-6 py-3 rounded-md hover:bg-pink-50">
                Nous contacter
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop"
              alt="Students in classroom"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;