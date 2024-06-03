https://github.com/yashrajshrestha/extension_chrome
https://github.com/yashrajshrestha/extension_frontend (master)
https://github.com/yashrajshrestha/extension_api (master)


To replicate in local:

1. Setup MongoDB

    1. Create a Collection Extension
    2. Create a Schema as follows
        1. title: String
        2. prices: String
        3. description: String
        4. images: String
        5. url: String
        6. category: String

2. Setup Backend via Docker

    1. Change .env to your respective mongodb, keys are
        1. MONGO_URL
        2. MONGO_DB
        3. MONGO_COLLECTION
    2. Docker Compose file is already include so, you just need to built the project
    3. Project will be build on port 4449
    4. API include:

        1. /add : insert data in single and bulk products
                curl  -X POST \
                'http://127.0.0.1:4449/add' \
                --header 'Accept: */*' \
                --header 'Content-Type: application/json' \
                --data-raw '{
                "title": "MWC Air Buds Mini 2" ,
                "prices": "Rs. 1,799",
                "descriptions": "MWC Air Buds",
                "images": "https://static-01.daraz.com.np/p/1375089c4b9036ccb7023040bd0b87e0.png_750x750.jpg_.webp",
                "url": "https://www.daraz.com.np",
                "category": "Buds"
                }'

        2. /showAll : shows all the insert data in json format

3. Setup Frontend via Docker

    1. Change .env to your respective backend, keys are
        1. REACT_APP_EXTENSION_API
    2. Docker Compose file is already include so, you just need to built the project
    3. Project will be build on port 3000

4. Setup Extension in Chrome

    1. Change url path of FRONTEND_URL and BACKEND_URL variable to your respective domain on popup.js file.
    2. Upload the extension on local chrome store