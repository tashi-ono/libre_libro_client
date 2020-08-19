# Libre Libro

## Description

Libre Libro is an app that shows you the location of little free libraries people have built around your neighborhood. Libre Libro means free books in Tagalog and Spanish.

### Project Links

- [Frontend Repo](https://github.com/tashi-ono/526_seir_libre_libro_api)
- [Backend Repo](https://github.com/tashi-ono/526_seir_fruitfinder_api)

### User Stories

MVP

- A user can add library locations on a map to add to the database.
- A user can search on a map for nearby libraries they can visit.
- A user can click on a pin which would show information about the library in a pop-up window
- A user can make comments on a specific library for the public to read.
- A user can click on the listed library and upload a photo of the library.

PostMVP

- A user can login to their personal account.
- A user can add their location to get a route to the library
- A user can chat with library owners or other users.
- A user can post in a watchlist/reviews section for books they may be looking for or write comments on a book they found.

### Wireframes

#### Mobile

- [Home](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597158998/LibreLibro%20Wireframes/Mobile_-_Home_lovy37.png)
- [Find Library](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159001/LibreLibro%20Wireframes/Mobile_-_Map_ofsih5.png)
- [Library Details](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159004/LibreLibro%20Wireframes/Mobile_-_Library_te5hft.png)
- [Add Library](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159008/LibreLibro%20Wireframes/Mobile_-_Add_Library_haiu8p.png)

#### Desktop/Tablet

- [Home](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159018/LibreLibro%20Wireframes/Desktop_-_Home_u1fid0.png)
- [Find Library](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159021/LibreLibro%20Wireframes/Desktop_-_Map_fmoquj.png)
- [Library Details](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159025/LibreLibro%20Wireframes/Desktop_-_Library_ozsuqz.png)
- [Add Library](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159027/LibreLibro%20Wireframes/Desktop_-_Add_Library_bulu7h.png)

#### PostMVP

Watchlist/Reviews Page

- [Mobile](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159041/LibreLibro%20Wireframes/PostMVP_-_Mobile_-_Watchlist-Reviews_dh9gqy.png)
- [Desktop](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597159047/LibreLibro%20Wireframes/PostMVP_-_Desktop_-_Watchlist-Reviews_fnd7ar.png)

#### Component Tree

[Libre Libro Components](https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597823169/LibreLibro%20Wireframes/LibreLibro_Components_xf8hxr.png)

### Time/Priority Matrix

| Component                   | Priority | Estimated Time | Time Invested |
| --------------------------- | :------: | :------------: | :-----------: |
| Backend                     |    H     |      4hrs      |     3hrs      |
| Nav                         |    M     |     0.5hrs     |     4hrs      |
| Homepage                    |    H     |      2hrs      |    5.5hrs     |
| Footer                      |    M     |     0.5hrs     |      0.5      |
| Google Map API              |    H     |      8hrs      |    17.5hrs    |
| Search Zipcode bar          |    H     |      4hrs      |     3hrs      |
| Render search results       |    H     |      4hrs      |    3.5hrs     |
| Library Details page(CRUD)  |    H     |      4hrs      |     3hrs      |
| Markers                     |    H     |      0hrs      |    3.5hrs     |
| Comments Form               |    H     |      2hrs      |    4.5hrs     |
| Add photo functionality     |    M     |      2hrs      |      1.5      |
| Library pop-up window       |    M     |      2hrs      |      1hr      |
| Add library form            |    H     |      5hrs      |     1hrs      |
| Connect Backend to Frontend |    H     |      5hrs      |    8.5hrs     |
| Styling                     |    H     |      5hrs      |     17hrs     |
| Deployment                  |    H     |      4hrs      |     2hrs      |
| Total                       |    -     |     52hrs      |     79hrs     |

## MVP/Post-MVP

### MVP

#### Basic Layout

- Nav
- Footer
- Homepage
- About

#### Find Library Page

- Google Map
- Markers
- Search Bar
- Selected pin will show library info

#### Add a Library Modal

- Add-library form
- Add-comments form

#### Library Details Page

- Update/delete info
- Render form for adding pics and comments
- CRUD user comments

### Post-MVP

- Add watchlist/reviews page
- Add login authentication
- Add a chat room
- Add library route from user's location

## Data Schema

#### One Library has_many Comments

```
  create_table "comments", force: :cascade do |t|
    t.string "username"
    t.string "user_comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "library_id"
  end

  create_table "libraries", force: :cascade do |t|
    t.string "name"
    t.decimal "lat"
    t.decimal "lng"
    t.string "details"
    t.string "img"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end
```

## Additional Libraries

- Google Maps API (Maps JavaScript API, Geocoding API, Places API)
- @react-google-maps/api
- use-places-autocomplete
- @reach/combobox
- reverse-geocode
- date-fns
- Axios
- React, react-router-dom
- Dotenv
- SASS/SCSS
