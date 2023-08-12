// import Replicate from "replicate";
const API_KEY = "r8_JRFKxpkBy97VLi9ynUvVE5XHrAAJQcP455tKs";
const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value;
}


const VERSIONS = [
    {
      name: "Llama 2 7B",
      version: "4b0970478e6123a0437561282904683f32a9ed0307205dc5db2b5609d6a2ceff",
      shortened: "7B",
    },
    {
      name: "Llama 2 13B",
      version: "d5da4236b006f967ceb7da037be9cfc3924b20d21fed88e1e94f19d56e2d3111",
      shortened: "13B",
    },
    {
      name: "Llama 2 70B",
      version: "2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
      shortened: "70B",
    },
  ];





async function getMessage() {
    console.log('clicked');
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({

        //         // model: "gpt-3.5-turbo"
        //         //    messages:[{role:"user",content:inputElement.value}],
        //         max_tokens: 100
        //     }),

        body: JSON.stringify({
            version: VERSIONS[2],
            prompt: `${prompt}
     Assistant:`,
            systemPrompt: "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as Assistant.",
            // temperature: parseFloat(temp),
            // topP: parseFloat(topP),
            // maxTokens: parseInt(maxTokens),
          }),



    };

    try {
        const response = await fetch('https://api.replicate.com/v1/predictions', options);
        const data = await response.json();
        console.log(data)
        outPutElement.textContent = data.choices[0].message.content;
        if (data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p'); 
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent));
            historyElement.append(pElement);
        }
    } catch (error) {
        // console.error(error);
    }
}

submitButton.addEventListener('click', getMessage);

function clearInput() {
    inputElement.value = '';
}

buttonElement.addEventListener('click', clearInput);
