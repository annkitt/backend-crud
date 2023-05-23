// Create a blog
app.post('/blogs', (req, res) => {
    const blog = req.body; // Assuming the blog data is sent in the request body
  
    db.collection('blogs').insertOne(blog, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error creating the blog' });
      } else {
        res.status(201).json({ message: 'Blog created successfully' });
      }
    });
  });
  
  // Read all blogs
  app.get('/blogs', (req, res) => {
    db.collection('blogs').find().toArray((err, blogs) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving blogs' });
      } else {
        res.json(blogs);
      }
    });
  });
  
  // Update a blog
  app.put('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
  
    db.collection('blogs').updateOne({ _id: mongodb.ObjectID(id) }, { $set: updates }, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error updating the blog' });
      } else if (result.modifiedCount === 0) {
        res.status(404).json({ error: 'Blog not found' });
      } else {
        res.json({ message: 'Blog updated successfully' });
      }
    });
  });
  
  // Delete a blog
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
  
    db.collection('blogs').deleteOne({ _id: mongodb.ObjectID(id) }, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error deleting the blog' });
      } else if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Blog not found' });
      } else {
        res.json({ message: 'Blog deleted successfully' });
      }
    });
  });
  