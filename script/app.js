
const COLORS = {
    "education" : {background: 'yellow', text: 'black'},
    "recreational" : {background: 'green', text: 'white'},
    "social" : {background: 'orange', text: 'black'},
    "diy" : {background: 'aqua', text: 'black'},
    "charity" : {background: 'blue', text: 'white'},
    "cooking" : {background: 'red', text: 'black'},
    "relaxation" : {background: 'pink', text: 'black'},
    "music" : {background: 'azure', text: 'black'},
    "busywork" : {background: 'grey', text: 'white'},
}

let error, loading = false;

const init = () => {
    document.querySelector('.c-card-app__button').addEventListener('click', requestActivity);
	requestActivity(false);
}

const requestActivity = async event => {
    if(event) event.preventDefault();
	if(error) errorNode.style.visibility = 'hidden';

	if(!loading){
	loading = true;
	const loadingElement = document.querySelector('.c-card-app__loading');
	loadingElement.style.visibility = 'visible';

    //getting the values
    let urlString = `https://www.boredapi.com/api/activity?`

    const tmpData = await getData(urlString);

	//om de loading animatie te tonen
	sleep(1000)
	.then(() => {setData(tmpData, loadingElement)})

	}
}

const setData = (data, loadingElement) => {

	if(data.activity)
	{
		const titleNode = document.querySelector('.c-card-app__title');
		const typeNode = document.querySelector('.c-card-app__type');
		const participantNode = document.querySelector('.c-card-app__participants-data');
		const priceNode = document.querySelector('.c-card-app__price progress');
		const difficultyNode = document.querySelector('.c-card-app__difficulty progress');
		

		titleNode.innerHTML = data.activity;
		typeNode.textContent = data.type;
		typeNode.style.backgroundColor = COLORS[data.type].background;
		typeNode.style.color = COLORS[data.type].text;

		participantNode.textContent = data.participants;
		priceNode.value = data.price;
		difficultyNode.value = data.accessibility;
		

		loading = false;
		loadingElement.style.visibility = 'hidden';

	}else {
		const errorNode = document.querySelector('.c-card-app__error');
		errorNode.style.visibility = 'visible';
	}

	
	
}

const getData = (url) =>{
	return fetch(url)
	.then(response => response.json())
	.then(data => {return (data)});
};

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
  }


document.addEventListener('DOMContentLoaded', function () {
    init();
});
