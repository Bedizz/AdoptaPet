import express from 'express';
import { pets } from './petList.js';
import petRouter from './routes/petRouter.js';


const app = express();
const port = 8001;

app.use('/animals',petRouter);

app.get('/', (req, res) => {
    const petTypeLinks = Object.keys(pets).map(type => `<li><a href="/animals/${type}">${type}</a></li>`).join('');
    res.send(`
        <h1>Adopt a Pet!</h1>
        <p>Browse through the links below to find your new furry friend:</p>
        <ul>
            ${petTypeLinks}
        </ul>
    `);
});


app.listen(port, () => {
  console.log(`Adopt a Pet app listening on port ${port}`)
})