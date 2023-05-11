import express, { Application } from 'express';
import index from './routes/index.route';

const app: Application = express()
const port = 8000;

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', index);

app.listen(port, () => {
    console.log(`FranceInter listening on port ${port}`);
})
