// import React from 'react'
// import { motion } from 'framer-motion'
// import config from '../config'
// import AnimatedBG from '../components/AnimatedBG'

// export default function About() {
//   return (
//     <div className="min-h-[calc(100vh-80px)] p-10 relative">
//       <AnimatedBG bgUrl={config.PAGE_BACKGROUNDS['/about']} />
//       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto content-on-bg">
//         <h1 className="text-4xl font-bold">About the Project</h1>
//         <p className="mt-4 text-gray-300">This project implements orientation-aware protein image classification and demonstrates predictions for categories: <strong>{config.DISEASES.join(', ')}</strong>.</p>

//         <section className="mt-8 grid md:grid-cols-2 gap-6 items-start">
//           <motion.div whileHover={{ y: -6 }} className="card p-6 rounded-2xl">
//             <h3 className="font-semibold">Approach</h3>
//             <p className="text-gray-300 mt-2">We train CNN-based encoders on many orientations (~100 projections per protein) so that the model recognizes structural features despite rotation. The front-end can upload images and call the demo backend for simulated classification outputs.</p>
//           </motion.div>

//           <motion.div whileHover={{ y: -6 }} className="card p-6 rounded-2xl">
//             <h3 className="font-semibold">Visualization</h3>
//             {/* <p className="text-gray-300 mt-2">Replace this placeholder with Mol* or PyMOL interactive embeds later. For the demo, a static placeholder is shown below.</p> */}
//             <div className="mt-4 w-full h-64 bg-black/10 rounded-lg flex items-center justify-center">3D preview placeholder</div>
//           </motion.div>
//         </section>

//         <section className="mt-8">
//           {/* <h3 className="font-semibold">Demo rules</h3> */}
//           {/* <p className="text-gray-300 mt-2">Filename-based demo: edit server/config.js → decideByFilename to change processing time and returned probabilities.</p> */}
//         </section>
//       </motion.div>
//     </div>
//   )
// }


import React from 'react'
import { motion } from 'framer-motion'
import config from '../config'
import AnimatedBG from '../components/AnimatedBG'

export default function About() {
  return (
    // Add padding-top so content doesn't sit under the fixed navbar
    <div className="min-h-[calc(100vh-80px)] p-10 pt-24 md:pt-28 relative">
      <AnimatedBG bgUrl={config.PAGE_BACKGROUNDS['/about']} routePath="/about" />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto content-on-bg">
        {/* added mt to further separate heading from the nav */}
        <h1 className="text-4xl font-bold mt-2 md:mt-4">About the Project</h1>
        <p className="mt-4 text-gray-300">This project implements orientation-aware protein image classification and demonstrates predictions for categories: <strong>{config.DISEASES.join(', ')}</strong>.</p>

        <section className="mt-8 grid md:grid-cols-2 gap-6 items-start">
          <motion.div whileHover={{ y: -6 }} className="card p-6 rounded-2xl">
            <h3 className="font-semibold">Approach</h3>
            <p className="text-gray-300 mt-2">We train CNN-based encoders on many orientations (~100 projections per protein) so that the model recognizes structural features despite rotation. The front-end can upload images and call the demo backend for simulated classification outputs.</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="card p-6 rounded-2xl">
            <h3 className="font-semibold">Visualization</h3>
            {/* <p className="text-gray-300 mt-2">Replace this placeholder with Mol* or PyMOL interactive embeds later. For the demo, a static placeholder is shown below.</p> */}
            <div className="mt-4 w-full h-64 bg-black/10 rounded-lg flex items-center justify-center">3D preview placeholder</div>
          </motion.div>
        </section>

        <section className="mt-8">
          {/* <h3 className="font-semibold">Demo rules</h3> */}
          {/* <p className="text-gray-300 mt-2">Filename-based demo: edit server/config.js → decideByFilename to change processing time and returned probabilities.</p> */}
        </section>
      </motion.div>
    </div>
  )
}
