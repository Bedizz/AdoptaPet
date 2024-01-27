import express from 'express';
import { pets } from '../petList.js';

export const getPetsType = (req,res) => {
    const petType = req.params.pet_type;

    if (!pets[petType]) {

        // eğer petType pets objesinde yoksa 404 döndür
        return res.status(404).send("Pet type not found");
    }

    const petItems =  pets[petType].map((pet) => {
        //petsin içindeki petType'ın içindeki petlerin isimlerini alıp link oluşturuyoruz ve petItems'a atıyoruz
        const petUrl = `/animals/${petType}/${pet.name}`;
        return `<li><a href="${petUrl}">${pet.name}</a></li>`;
        // return kısmında petUrl ile pet.name'i birleştirip link oluşturuyoruz
    });

// 
    const content = `
        <button onclick="window.history.back();">Go Back</button>
        <h1>List of ${petType}</h1>
        <ul>
            ${petItems.join('')}
        </ul>
    `;
    //join kullanmamızın sebebi, petItems'ın içindeki elemanları birleştirmektir ancak join kullanmazsak virgül ile birleştirir ve virgülü de gösterir. Virgülü göstermemek için join kullanıyoruz.
    res.send(content);
}

export const getPetsName = (req,res) => {
    const { pet_type, pet_id } = req.params;
    // pet_type ve pet_id'yi req.params ile alıyoruz

    const findPet = pets[pet_type].find(pet => pet.name.toLowerCase() === pet_id.toLowerCase());
    // pet_type'ın içindeki petlerin isimlerini alıp pet_id ile karşılaştırıyoruz. Eğer pet_id ile pet.name eşitse findPet'e atıyoruz.toLowerCase() ile büyük küçük harf duyarlılığını ortadan kaldırıyoruz.

    if (!findPet) {
        return res.status(404).send("Pet not found");
    }
    const content = `
        <button onclick="window.history.back();">Go Back</button>
        <h1>${findPet.name}</h1>
        <img src="${findPet.url}" alt="${findPet.name}" />
        <p>${findPet.description}</p>
        <ul>
            <li>Breed: ${findPet.breed}</li>
            <li>Age: ${findPet.age}</li>
        </ul>
    `;
    res.send(content);
    
}