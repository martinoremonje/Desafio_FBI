import express from 'express';
import router from './routes/routes.js'
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));


app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use('/', router)


app.listen(PORT, () => console.log(`Servidor corriendo en: http://localhost:${PORT}`));