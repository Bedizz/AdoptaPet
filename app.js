import express from 'express';
import petList from './petList.js';

const app = express()
const port = 8000


const dogs = petList.dogs;
const cats = petList.cats;
const rabbits = petList.rabbits;

app.get('/', (req, res) => {
    res.send('<h1>Adopt a Pet</h1><p>Browse through the links below to find your new furry friend:</p><ul><li><a href="animals/dogs">Dogs</a></li><li><a href="animals/cats">Cats</a></li><li><a href="animals/rabbits">Rabbits</a></li></ul>')
})

app.get('/animals/:pet_type', (req, res) => {
    const { pet_type,pet_id } = req.params;

    // let petList;
    // if (pet_type === 'dogs') {
    //     petList = dogs;
    // } else if (pet_type === 'cats') {
    //     petList = cats;
    // } else if (pet_type === 'rabbits') {
    //     petList = rabbits;
    // } else {
    //     // Handle invalid pet_type here
    //     res.send('Invalid pet type');
    //     return;
    // }
    // if (["dogs", "cats", "rabbits"].includes(pet_type)) {

        const respArr = petList[pet_type]
        if (respArr.length > 0){
    
        res.send(`<h1>List of ${pet_type}</h1><ul>${respArr.map(pet => `<li><a href=/animals/${pet_type}/${pet_id} >${pet.name}</a></li>`)}</ul>`);
    }
    res.status(404)
});


app.get('/animals/:pet_type/:pet_id', (req, res) => {
    const { pet_id, pet_type } = req.params;
    const findPet = petList[pet_type].find(pet => pet.name === pet_id);
    console.log(findPet)
    if (findPet) {
        res.send(`<h1>${findPet.name}</h1><p>Age: ${findPet.age}</p><p>Breed: ${findPet.breed}</p><p>${findPet.description}</p><img src=${findPet.url} alt=${findPet.name} />`);
    } else {
        res.status(404).send(`No pet found with id: ${pet_id}`);
    }
    

    

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})