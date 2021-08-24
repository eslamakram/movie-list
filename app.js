'use strict';

let form = document.getElementById('formMovie');
form.addEventListener('submit',saveHandler);
form.addEventListener('button',clearHandler);
let tableContainer = document.getElementById('tableSection');
let tableMovie = document.createElement('table');
tableMovie.addEventListener('remove',removeHandler);
tableContainer.appendChild(tableMovie);



let categoryMovie =['action', 'adventure', 'animation', 'comedy', 'detective', 
'fantasy', 'history', 'horror', 'musical', 'pirate' ,'romantic', 'sci-fi', 'war' ,'western' ];

function movie(movieName, movieImg, movieRelease){
    this.movieName = movieName;
    this.movieImg = movieImg;
    this.movieRelease =  movieRelease;
    movie.all.push(this);
}

movie.all = [];
getData();


function render(){

    for (let i = 0; i < movie.all.length; i++) {
    
    let tableRow = document.createElement('tr');
    tableMovie.appendChild(tableRow);

   let rowRemove = document.createElement('th');
   rowRemove.textContent = 'X';
   rowRemove.id = 'remove';
   tableRow.appendChild(rowRemove);

   let imgCell = document.createElement('th');
    let img = document.createElement('img');
    img.src =  `./img/${movie.all[i].movieImg}.png`;
   imgCell.appendChild(img);
   tableRow.appendChild(imgCell);

   let movieNameCell = document.createElement('th');
   movieNameCell.textContent = movie.all[i].movieName;
   tableRow.appendChild(movieNameCell);

   let movieReleaseCell = document.createElement('th');
   movieReleaseCell.textContent = movie.all[i].movieRelease;
   tableRow.appendChild(movieReleaseCell);

}

}




function saveHandler(event){
    event.preventDefault();
   // clearTable();
     let movieName = event.target.movieName.value;
    let movieImg = event.target.images.value;
    let  movieRelease =  event.target.movieRelease.value;

    new movie(movieName, movieImg, movieRelease);
    saveLocal();
    render();
    form.reset();
}


function clearHandler(event){

    tableMovie.innerHTML = '';
}


function  clearTable(){

    while(tableMovie.length >1){
     
        tableMovie.removeChild(tableMovie.lastChild);

    }
}


function saveLocal(){
  
    localStorage.setItem('storedMovies', JSON.stringify(movie.all));

}

function getData(){
 if(localStorage.getItem('storedMovies')){
      let storedMovies = JSON.parse(localStorage.getItem('storedMovies'));
       for (let i = 0; i < storedMovies.length; i++) {
          
          new movie(storedMovies[i].movieName,storedMovies[i].movieImg, storedMovies[i].movieRelease);
       }
    render();
 }

}

function removeHandler(event){
  
    if(event.target.id == 'remove'){

        let index = event.target.parentElement.rowIndex;
        movie.all.splice(index-1,1);
       event.target.parentElement.remove();
       saveLocal();


    }

}