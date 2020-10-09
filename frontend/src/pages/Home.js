import React from 'react'
import Carrousel from '../components/Carrousel'
import BestSellers from '../components/BestSellers'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { motion } from 'framer-motion'

class Home extends React.Component {

    render() {
        const logo = require('../images/logo.png')


        return (
            <>
                <Header />
                <motion.div className="logoMotion" style={{backgroundImage: `url(${logo})`}}
                initial={{x: -1000, scale: 0}}
                animate={{x: 0, scale: 1, rotate: 1440 }}
                transition={{ duration: 1 }}
                >
                </motion.div>
                <Carrousel />
                <BestSellers />
                <Footer />
            </>
        )
    }
}

export default Home
