import { motion } from 'framer-motion'

export const LoadingWithLogo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col items-center"
      >
        {/* Imagen con proporción conservada y parpadeo */}
        <motion.img
          src="/logo-psicoeducativa.png"
          alt="Mi logo"
          className="w-auto h-auto max-w-[70%] max-h-[40vh] object-contain mb-4"
          animate={{ opacity: [1, 0.2, 1] }} // Ciclo de opacidad para parpadeo
          transition={{
            duration: 1.5, // Duración de cada ciclo de parpadeo
            repeat: Infinity, // Repetir infinitamente
            ease: 'easeInOut', // Suavizar la transición
          }}
        />

        {/* Línea animada más grande con color primario */}
        <motion.div
          className="w-12 h-1 bg-primary rounded-full mt-4"
          initial={{ width: 0 }}
          animate={{ width: '5rem' }} // Línea más grande
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}
