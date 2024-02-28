
class Pet{
    constructor(
        title = 'title',
        name = 'Unknown', 
        gender = 'Unknown', 
        age = '0', 
        isNeutered = false, 
        contact = 'Unknown'){
        this.title = title;    
        this.name = name;
        this.gender = gender;
        this.age = age; 
        this.isNeutered = isNeutered;
        this.contact = contact;
    }
}

class petList{
    constructor(){
        this.pets = [];
    }

    addPet(newPet) {
        
            this.pets.push(newPet);
        
    }

    removePet(title) {
        this.pets = this.pets.filter((pet) => pet.title !== title)
    }

    getPet(title) {
        return this.books.find((book) => book.title === title)
      }
    
   /*   isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
      } */
}

const petlist = new petList;

const addPetBtn = document.getElementById('addPetBtn');
const addPetModal = document.getElementById('addPetModal');
const addPetForm = document.getElementById('addPetForm');
const petsGrid = document.getElementById('petsGrid');
const overlay = document.getElementById('overlay');
const errorMsg = document.getElementById('errorMsg');

const openAddPetModal = () => {
    addPetForm.reset();
    addPetModal.classList.add('active');
    overlay.classList.add('active');
}

const closePetModal = () => {
    addPetModal.classList.remove('active');
    overlay.classList.remove('active');
}


const updatePetsGrid = () => {
    resetPetsGrid ();
    for(let pet of petlist.pets) {
        createPetCard(pet);
    }
}

const resetPetsGrid = () => {
    petsGrid.innerHTML = '';
}


const createPetCard = (pet) => {
    const petCard = document.createElement('div');
    const title = document.createElement('p');
    const name = document.createElement('p');
    const gender = document.createElement('p');
    const age = document.createElement('p');
    const contact = document.createElement('contact');
    const buttonGroup = document.createElement('div')
    const neuteredBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

  petCard.classList.add('pet-card');
  buttonGroup.classList.add('button-group');
  neuteredBtn.classList.add('btn');
  removeBtn.classList.add('btn');
  neuteredBtn.onclick = toggleNeutered;
  removeBtn.onclick = removePet;

  title.textContent = `"${pet.title}"`;
  name.textContent = pet.name;
  age.textContent = `${pet.age} `
  contact.textContent = pet.contact;
  removeBtn.textContent = 'Remove';

    petCard.appendChild(title);
    petCard.appendChild(name);
    petCard.appendChild(gender);
    petCard.appendChild(age);
    petCard.appendChild(contact);
    buttonGroup.appendChild(neuteredBtn);
    buttonGroup.appendChild(removeBtn);
    petCard.appendChild(buttonGroup);
    petsGrid.appendChild(petCard);
} 



const getPetFromInput = () => {
    const title = document.getElementById('title').value;
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const isNeutered = document.getElementById('isNeutered').checked;
    const contact = document.getElementById('contact').value;
    return new Pet(title, name, gender, age, isNeutered, contact)
} 

const addPet = (e) => {
    e.preventDefault();
    const newPet = getPetFromInput();

    petlist.addPet(newPet);
    saveLocal();
    updatePetsGrid();

    closePetModal();

}   
addPetBtn.onclick = openAddPetModal;
addPetForm.onsubmit = addPet; 

const removePet = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ''
  )
    petlist.removePet(title);
    saveLocal();
    updatePetsGrid();
  
}

const toggleNeutered = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ''
  )
  const pet = petlist.getPett(title)
    pet.isNeutered = !pet.isNeutered;
    saveLocal();
    updatePetsGrid();
  
}


// Local Storage

const saveLocal = () => {
    localStorage.setItem('petlist', JSON.stringify(petlist.pets));
  }
  
  const restoreLocal = () => {
    const pets = JSON.parse(localStorage.getItem('petlist'));
    if (pets) {
      petlist.pets = pets.map((pet) => JSONToPet(pet));
    } else {
      petlist.pets = [];
    }
  }

  const JSONToPet = (pet) => {
    return new Pet(pet.title, pet.name, pet.age, pet.isNeutered, pet.contact);
  }

  restoreLocal();
  updatePetsGrid();


  /*

const docsToPets = (docs) => {
    return docs.map((doc) => {
      return new Pet(
        doc.data().title,
        doc.data().name,
        doc.data().age,
        doc.data().isNeutered,
        doc.data().contact,
      )
    })
  }
  
  const JSONToPet = (pet) => {
    return new Pet(pet.title, pet.name, pet.age, pet.isNeutered, pet.contact)
  }

/*
form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const newTitle = title.value.trim();
    const newName = name.value.trim();
    const newAge = +pages.value;
  //  const newIsRead = isRead.checked ? true : false;
  
    addBookToLibrary(newTitle, newAuthor, newPages, newIsRead);
  
    title.value = "";
    author.value = "";
    pages.value = "";
    isRead.checked = false;
    modal.classList.remove("visible");
  }); */


// Display

/*

Pet.prototype.display = function (e) {
    const card = document.createElement("div");
    const textGroup = document.createElement("div");
    const buttonGroup = document.createElement("div");
  
    card.classList.add("card");
    textGroup.classList.add("text-group");
    buttonGroup.classList.add("button-group");
  
    card.append(textGroup, buttonGroup);
  
    const title = document.createElement("div");
    title.classList.add("text-title");
    title.textContent = this.title;
  
    const name = document.createElement("div");
    name.classList.add("text-name");
    name.textContent = this.name;

    const gender = document.createElement("div");
    gender.classList.add("text-gender");
    gender.textContent = this.gender;
  
    const age = document.createElement("div");
    age.classList.add("text-age");
    age.textContent = this.age + " age";
  
    const btnAdopted = document.createElement("button");
    const btnRemove = document.createElement("button");
  
    btnAdopted.classList.add("btn-adopted");
    btnRemove.classList.add("btn-remove");
    if (this.isadopted) {
      btnAdopted.textContent = "Adopted";
    } else {
      btnAdopted.textContent = "Not Adopted";
      btnAdopted.style.backgroundColor = "#ff0000";
    }
  
    btnRemove.textContent = "Remove";
  
    textGroup.append(title, name, gender, age);
    buttonGroup.append(btnAdopted, btnRemove);
    cardContainer.append(card);
  
    btnRemove.onclick = removeCard;
    btnAdopted.onclick = changeStatus;
  };
  
  function displayPets() {
    petList.forEach((pet) => {
        const card = document.createElement("div");
        const textGroup = document.createElement("div");
        const buttonGroup = document.createElement("div");
      
        card.classList.add("card");
        textGroup.classList.add("text-group");
        buttonGroup.classList.add("button-group");
      
        card.append(textGroup, buttonGroup);
      
        const title = document.createElement("div");
        title.classList.add("text-title");
        title.textContent = this.title;
      
        const name = document.createElement("div");
        name.classList.add("text-name");
        name.textContent = this.name;
    
        const gender = document.createElement("div");
        gender.classList.add("text-gender");
        gender.textContent = this.gender;
      
        const age = document.createElement("div");
        age.classList.add("text-age");
        age.textContent = this.age + " age";
      
        const btnAdopted = document.createElement("button");
        const btnRemove = document.createElement("button");
  
      if (pet.isAdopted) {
        btnAdopted.textContent = "Adopted";
      } else {
        btnAdopted.textContent = "Not Adopted";
        btnAdopted.style.backgroundColor = "#ff0000";
      }
  
      btnRemove.textContent = "Remove";
  
      textGroup.append(title, name, gender, age);
      buttonGroup.append(btnAdopted, btnRemove);
      cardContainer.append(card);
    
      btnRemove.onclick = removeCard;
      btnAdopted.onclick = changeStatus;
    });
  }
  
  displayPets();

  */
  