# Travel search (Backend challenge)
Backend challenge for the Vueling tech hack on [nuwe.io](https://nuwe.io/dev/competitions/vueling-tech-hack/travel-search-backend-challenge)


## Requirements
You will need to have installed on your local machine:
* NodeJS (https://nodejs.org/ca/)
* MySQL Server (https://www.mysql.com/)

## Installation
### Load the Database
On `app->database->database.sql` you will find the database ready to be loaded on your MySQL server together with some example values.

Just copy and paste the code on a program such as "MySQL Workbench" or your "phpMyAdmin" or similar.

Or from a terminal, if you have it configured, run the command `mysql -u [user] -p < [path to database.sql] --default-character-set=utf8`. Mind the character-set to properly introduce the names in Chinese and Arabic alphabets (you might have to run the command from a directory similar to: `C:\Program Files\MySQL\MySQL Server 8.0\bin`). 

### Define environment variables
On the root directory of this repository you will find a `.env-template` file. Make a copy of it and name it `.env`. Then fill the parameters inside with the configuration of your MySQL server (host, port, username and password). Password can be left blank if there is no password.

The database name `vueling-nuwe-osr` should NOT be changed. In the case it were necessary to do so, the `database.sql` file should be updated accordingly.

The `EXPRESS_HOST` and `EXPRESS_PORT` variables should also not be changed if there is no particular reason for it.

### Install dependencies
Open a terminal on the root directory of this repository and run the command:

    npm install

To install the needed dependencies.

### Start the server
Once this has been done, you can start the server with the command:

    npm start

and then you can access the server at `http://localhost:3000` (if you didn't change the parameters `EXPRESS_HOST` and `EXPRESS_PORT`).

## How does it work
This MVP searches for trips with cities that match the text entered by the user anywhere in the city name.

This means, the input `'celona'` will search for trips that contain, for example, the city of 'Bar**celona**'. Or the input `'lin'` will yield trips containing either the city of 'Ber**lin**' or 'Dub**lin**'

The input should be at least 3 characters long.

The input can be on any language accepted by the system (check the table `language` on the database). This means, the capital of China, Beijing, can be found matching either: 'Pequ??n' (in Catalan), 'Pek??n' (in Spanish), 'Beijing' (in English), '?????????' (in Chinese) or '????????' (in Arabic).

The input is introduced as a parameter on `http://localhost:3000/[input]` on a GET method.

### Output

The output is a json with, as data, an array of all the trips containing cities matching the input, following the structure:
```javascript
{
    status: [Int, http status code],
    error: [if any: {message: error_message}],
    message: [if any: String],
    data: [{
        name: [String]
        type: [air/land]
        days: [Int]
        cities: [Array of cities]
        details: [Array]
            {hotel, stars, city}
            or
            {departure_city, departure_time}
    }]
}
```

Details vary depending if the trip is air or land type.

### Example

- `http://localhost:3000/celona` will return something like:
```js
    {
        status: 200,
        error: null,
        message: "Matching 'celona' in: Barcelona",
        data: [{
            name: "The Asian Magnolia",
            type: "air",
            days: 7,
            cities: ["Barcelona","?????????","?????????"],
            details: [{
                departure_city: "Barcelona",
                departure_time: "07:30:00"
            },{
                departure_city: "?????????",
                departure_time: "22:00:00"
            }]
        },{
            name: "Eruopes core",
            type: "land",
            days: 4,
            cities: ["Barcelona","London","Berlin"],
            details: [{
                hotel: "Hotel Mediterr??nia",
                stars: 4,
                city: "Barcelona"
            },{
                hotel: "Hotel Wald der Greifen",
                stars: 5,
                city: "Berlin"
            }]
        }]
    }
```

## Some details

Currently the cities are shown with a `common_name` which is the local name of the city if that language is in the database, otherwise English is chosen (for example Tokyo and Hanoi, since Japanese and Vietnamese are still not introduced in the system). In the example shown above, Barcelona is shown in Catalan while Beijing and Shanghai are shown in Chinese.

## How to handle new features (some examples)

- New languages can easily be added to the database, and then the cities should be translated with the new language.

- A second parameter `langi` (language input) with the ISO-code of the language could be added and then only cities matching the input in the specified language would be searched.

    <!-- This could be achieved adding a simple condition (`WHERE language='langi'`) to the query searching for matches on cities. -->

- A similar parameter `lango` (language output) could be added to show in the results the name of the cities with the desired language. This would be useful in the example shown above, then the cities of the first trip would be: [Barcelona, Xanghai, Pequ??n].

    This can be achieved with the instance method in the City model `nameInLanguage(lang)`, which accepting the ISO 639-2/T language code as input, it returns asynchronously, if available, the name of the city in that language. If not translated, it returns the common name.

- New types of travel different to air/land could be added by creating a new table on the database similar to `trip_land` or `trip_air` with the corresponding details of the new type of travel.