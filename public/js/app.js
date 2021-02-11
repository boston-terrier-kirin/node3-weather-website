const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	messageOne.textContent = 'Loading...';

	fetch('http://192.168.0.11:3000/weather?address=' + search.value).then(
		(res) => {
			res.json().then((data) => {
				if (data.error) {
					alert(data.error);
				} else {
					messageOne.textContent = data.location;
					messageTwo.textContent = data.temperature;
					messageThree.textContent = data.feelslike;
				}
			});
		}
	);
});
