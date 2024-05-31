document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: scrapePrice
      }, (results) => {

        if(results[0].result.price === 'Price not found'){
          document.getElementById('price').textContent = 'Please try to visit a single product page!'
          return true;
        }
        document.getElementById('price').textContent = 'Product Sync Complete. Please check portal';
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
    return {
      'price': priceElement ? priceElement.innerText : 'Price not found',
      'imageElement': imageElement ? imageElement.src : 'Image not found',
      'descriptionElement': descriptionElement ? descriptionElement.innerHTML : 'Description not found',
      'titleElement': titleElement ? titleElement : 'Title not found',
      'urlElement': urlElement ? urlElement : 'URL not found'
    };
    // return priceElement ? priceElement.innerText : 'Price not found';
  }


function sendDataToAPI(data){
  console.log('Sending Data to API:', data);
  const apiEndpoint = 'http://127.0.0.1:5000/add';

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
