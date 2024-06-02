const FRONTEND_URL = "http://127.0.0.1:3000";
const BACKEND_URL = "http://127.0.0.1:4449";

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
        
        document.getElementById('price').innerText = 'Syncing ...';
        sendDataToAPI(results[0].result);
      });
    });
  });
  
  function scrapePrice() {
    const categoryType = window.location.pathname.split('/')[1];
    if(categoryType !== 'products'){
      
      const productList = [];
      const productElements = document.querySelectorAll('.gridItem--Yd0sa');

      productElements.forEach(product => {
        

        const price = product.querySelector('.current-price--Jklkc')?.innerText;
        const title = product.querySelector('.title-wrapper--IaQ0m')?.innerText;
        const description = product.querySelector('.free-delivery--OD68c')?.innerText;
        const image = product.querySelector('.image--Smuib')?.src;
        const url = window.location.href;
        const category = categoryType;

        productList.push({
          'prices': price,
          'images': image,
          'descriptions': description,
          'title': title,
          'url': url,
          'category': category  
        })

      });

      return productList;

    } else {
      
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
    }
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
    document.getElementById('price').innerHTML = `Product Sync Complete. Please check portal on <a href="${FRONTEND_URL}" target="_blank">${FRONTEND_URL}</a>`;
    console.log('Success:', data);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}
