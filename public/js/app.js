console.log("Javascript File Successfully loaded into this file so no need to worry about that, I will take care of that....")

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location )
    .then(response => response.json().then(data => {
        if(data.error){
            messageOne.textContent = data.error,
            messageTwo.textContent = ''
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    }))    
})