const FRONTEND_URL = "http://127.0.0.1:3000";
const BACKEND_URL = "http://127.0.0.1:4449";

document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: scrapePrice
      }, (results) => {

        const url = "http://127.0.0.1:3000";

        if(results[0].result.price === 'Price not found'){
          document.getElementById('price').textContent = 'Please try to visit a single product page!'
          return true;
        }
        document.getElementById('price').innerHTML = `Product Sync Complete. Please check portal on <a href="${FRONTEND_URL}" target="_blank">${FRONTEND_URL}</a>`;
        sendDataToAPI(results[0].result);
      });
    });
  });
  
  function scrapePrice() {
    const priceElement = document.querySelector('.pdp-price.pdp-price_type_normal.pdp-price_color_orange.pdp-price_size_xl');
    const titleElement = document.title;
    const descriptionElement = document.querySelector('.html-content.pdp-product-highlights');
    const imageElement = document.querySelector('.gallery-preview-panel__image');
    const urlElement = window.location.href;
    const categoryElement = document.querySelectorAll('.breadcrumb_item_anchor')[2];
    return {
      'price': priceElement ? priceElement.innerText : 'Price not found',
      'imageElement': imageElement ? imageElement.src : 'Image not found',
      'descriptionElement': descriptionElement ? descriptionElement.innerHTML : 'Description not found',
      'titleElement': titleElement ? titleElement : 'Title not found',
      'urlElement': urlElement ? urlElement : 'URL not found',
      'categoryElement': categoryElement ? categoryElement.innerText : 'Category not found'
    };
    // return priceElement ? priceElement.innerText : 'Price not found';
  }


function sendDataToAPI(data){
  console.log('Sending Data to API:', data);
  const apiEndpoint = `${BACKEND_URL}/add`;

  fetch(apiEndpoint,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(data) 
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}
