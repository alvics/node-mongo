# Mongo Db
```
const mongoose = require('mongoose');
require('dotenv').config();

const Post = require('./database/models/Post');
const db_host = process.env.DB_HOST;
mongoose.connect(db_host);
```

### find()
 Read from the database, returns a lists of all the objects in database. 
 
 To find a single blog by title, use find({title:'Name of title'})
 ```
Post.find({}, (error, posts) => {
   console.log(error, posts);
});
```
### findById()
```
 Post.findById('5d2a5bf1a246de3d0c6b9e18', (error, post) => {
    console.log(error, post);
 });
```

### findByIdAndUpdate()
 Refresh database after 
```
 Post.findByIdAndUpdate('5d2a5bf1a246de3d0c6b9e18', {
    title: 'My First Updated Title'
 }, (error, post) => {
     console.log(error, post)
 })
```
### create() 
 create posts with the Post model
 ```
 Post.create(
   {
     title: 'My Second Blog Post!',
     description: 'Learn Front to Back Web Development',
     content:
       "This is my second blog to mongodb. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
   },
   (error, post) => {
     console.log(error, post);
   }
 );
```