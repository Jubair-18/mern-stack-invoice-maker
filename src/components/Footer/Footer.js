import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Footer.module.css'
import FabButton from '../Fab/Fab'
import {Typography} from '@material-ui/core'

const Footer = () => {
    const location = useLocation()
    const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <footer>
            <div className={styles.footerText}>
                <Typography variant="h4" color="initial"> Riyad Bhai Rocks </Typography>
            </div>
            {user && (
            <FabButton />
            )}
        </footer>
    )
}

export default Footer
