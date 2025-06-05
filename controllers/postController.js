const Post = require('../models/postModel');

const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      date: req.body.date,
      image: req.file.filename,
    });
    const postData = await post.save();

    res.status(200).json({
      success: true,
      message: 'Post Successfully',
      data: postData,
    });
  } catch (error) {
    console.log('create Post catch error(postController.js)', error.message);
    res.status(404).json({
      success: false,
      message: 'create Post catch error(postController.js)',
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send({
      success: true,
      message: ' Post all Data(postController.js)',
      data: posts,
    });
  } catch (error) {
    console.log('get catch error(postController.js)', error.message);
    res.status(400).json({
      success: false,
      message: 'get catch error(postController.js)',
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'delete data successfully(postController.js)',
    });
  } catch (error) {
    console.log('delete catch error(postController.js)', error.message);
    res.status(400).json({
      success: false,
      message: 'delete catch error(postController.js)',
    });
  }
};

const updatePost = async (req, res) => {
  try {
    if (req.file !== undefined) {
      var id = req.body.id;
      var title = req.body.title;
      var date = req.body.date;
      var image = req.file.filename;

      await Post.findByIdAndUpdate(
        { _id: id },
        { $set: { title: title, date: date, image: image } }
      );
      res.status(200).send({
        success: true,
        message: 'update data successfully(postController.js)',
      });
    } else {
      var id = req.body.id;
      var title = req.body.title;
      var date = req.body.date;

      await Post.findByIdAndUpdate(
        { _id: id },
        { $set: { title: title, date: date } }
      );
      res.status(200).send({
        success: true,
        message: 'update data successfully ELSE(postController.js)',
      });
    }
  } catch (error) {
    console.log('update catch error(postController.js)', error.message);
    res.status(400).json({
      success: false,
      message: 'update catch error(postController.js)',
    });
  }
};
module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost, 
};
