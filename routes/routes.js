import express from 'express';
import { home, loginForm, register, contact, admin, addAgent, login } from '../controllers/controller.js'
const router = express.Router()

router.get('/', home)

router.get('/login', loginForm)
router.get('/register', register)
router.get('/admin', admin)

router.post('/register', addAgent)
router.post('/login', login)

router.get('*', (req, res)=>{
res.send('404 - page not found')
})


export default router