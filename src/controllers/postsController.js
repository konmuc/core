const Post = require('../models/post');

const postsController = function(){}

// Function index [Post]
// Give back a complete list of posts
postsController.index = function(req, res) {
    try{
        Post.find(
            {},
            function(err, posts) {
                var postMap = {};

                if(!err && (posts.length > 0)) {
                    posts.forEach(
                        function(post) {
                            postMap[post._id] = post;
                        }
                    );
                    res.status(200).send(postMap);
                }
                else {
                    res.status(204).send();
                }
            }
        )
    }
    catch (err) {
        return res.status(500).send('ERROR:postsController.index');
    }
};

// Function postsOfSpecificUser [Post]
// Give back a complete list of posts of specific user
postsController.postsOfSpecificUser = function(req, res) {
    try {
        Post.find(
            {
                username: req.params.username
            },
            function(err, posts) {
                var postMap = {};

                if(err) {
                    return res.status(204).send(err);
                }

                if( post.length === 0) {
                    return res.status(204).send();
                }

                posts.forEach(
                    function(post) {
                        postMap[post._id] = post;
                    }
                );
                return res.status(200).send(postMap);
            }
        );
    }
    catch(err) {
        return res.status(500).send(
            'ERROR: postsController.postsOfSpecificUser ' + err);
    }
}

// Function createPost [Post]
// Create post
postsController.createPost = function(req, res) {

    let text = req.body.content.text ? req.body.content.text : null;
    let image = req.body.content.metadata.image ? req.body.content.metadata.image : "";
    let lat = req.body.content.metadata.geolocation.lat ? req.body.content.metadata.geolocation.lat : "NaN";
    let lon = req.body.content.metadata.geolocation.lat ? req.body.content.metadata.geolocation.lon : "NaN";

    try {
        var post = new Post({
            username: req.user.username,
            content: {
                text: text,
                metadata: {
                    date: Date.now(),
                    image: image,
                    geolocation: {
                        lat: lat,
                        lon: lon
                    }
                }
            },
            votes: {
                upvotes: [],
                downvotes: []
            },
            comments: []
        });

        post.save(
            function(err, post) {
                if(err) {
                    return res.status(500).send(
                        'ERROR: postsController.createPost -' +
                        ' While Post.create() ' + err)
                }
                return res.status(200).send(post);
            }
        )
    }
    catch(err) {
        return res.status(500).send('ERROR: postsController.createPost' + err);
    }
}

// Function specificPostById [Post]
// Give back a specific post
postsController.specificPostById = function(req, res) {
    try {
        Post.findById(
            req.params.postId,
            function(err, post){
                if(err) {
                    return res.status(404).send(
                        'ERROR: postsController.specificPostById -' +
                        ' While Post.findById() ' + err)
                }
                return res.status(200).send(post);
            }
        )
    }
    catch(err) {
        res.status(500).send('ERROR: postsController.specificPostById ' + err);
    }
}

// Function hideSpecificPostById [Post]
// Hide post from timeline
postsController.hideSpecificPostById = function(req, res) {
    try {
        Post.findByIdAndUpdate(
            req.params.postId,
            {isHidden: true},
            function(err, post) {
                if(err) {
                    return res.status(404).send(
                        'ERROR: postsController.hideSpecificPostById -' +
                        ' While Post.findByIdAndUpdate() ' + err)
                }
                return res.status(200).send();
            }
        )
    }
    catch(err) {
        return res.status(500).send('ERROR: postsController.hideSpecificPostById ' + err);
    }
}

postsController.postUpVote = function(req, res) {
    try {
        Post.findById(
            req.params.postId,
            function(err, post) {
                if(err) {
                    return res.status(404).send(
                        'ERROR: postsController.postUpVote -' +
                        ' While Post.findById() ' + err)
                }

                post.votes.downvotes.forEach(element => {
                    if(element.userId === req.user.id)
                        return res.status(200).send("Already voted!");
                });

                post.votes.upvotes.forEach(element => {
                    if(element.userId === req.user.id)
                        return res.status(200).send("Already voted!");
                });

                post.votes.upvotes.push(
                    {
                        userId: req.user.id
                    }
                );
                post.save(
                    function(err, post) {
                        if(err) {
                            return res.status(404).send(
                                'ERROR: postsController.postUpVote - ' + 
                                'While Post.findById() ' + err)
                        }
                        return res.status(200).send(post);
                    }
                );
            }
        )
    }
    catch(err){
        return res.status(500).send('ERROR: postsController.postUpVote ' + err);
    }
}

postsController.postDownVote = function(req, res) {
    try {
        Post.findById(
            req.params.postId,
            function(err, post) {
                if(err) {
                    return res.status(404).send(
                        'ERROR: postsController.postDownVote -' +
                        ' While Post.findById() ' + err)
                }

                post.votes.downvotes.forEach(element => {
                    if(element.userId === req.user.id)
                        return res.status(200).send("Already voted!");
                });

                post.votes.upvotes.forEach(element => {
                    if(element.userId === req.user.id)
                        return res.status(200).send("Already voted!");
                });

                post.votes.downvotes.push(
                    {
                        userId: req.user.id
                    }
                );
                post.save(
                    function(err, post) {
                        if(err) {
                            return res.status(404).send(
                                'ERROR: postsController.postDownVote -' +
                                ' While post.save() ' + err)
                        }
                        return res.status(200).send(post);
                    }
                );
            }
        )
    }
    catch(err){
        return res.status(500).send('ERROR: postsController.postDownVote' + err);
    }
}

postsController.addComment = function(req, res) {

    let text = req.body.content.text ? req.body.content.text : null;
    let image = req.body.content.metadata.image ? req.body.content.metadata.image : "";
    let lat = req.body.content.metadata.geolocation.lat ? req.body.content.metadata.geolocation.lat : "NaN";
    let lon = req.body.content.metadata.geolocation.lat ? req.body.content.metadata.geolocation.lon : "NaN";

    try {
        Post.findById(
            req.params.postId,
            function(err, post) {
                if(err) {
                    return res.status(404).send(
                        'ERROR: postsController.addComment -' +
                        ' While Post.findById() ' + err)
                }
                else {
                    Post.findByIdAndUpdate(
                        req.params.postId,
                        {
                            $push: {
                                "comments": {
                                    username: req.user.username,
                                    content: {
                                        text: text,
                                        metadata: {
                                            date: Date.now(),
                                            image: image,
                                            geolocation: {
                                                lat: lat,
                                                lon: lon
                                            }
                                        }
                                    },
                                    votes: {
                                        upvotes: [],
                                        downvotes: []
                                    }
                                }
                            }
                        },
                        function(err, post) {
                            if(err) {
                                return res.status(404).send(
                                    'ERROR: postsController.addComment -' +
                                    ' While post.save() ' + err)
                            }
                            return res.status(200).send(post);
                        }
                    )
                }
            }
        )
    }
    catch(err) {
        return res.status(500).send('ERROR: postsController.addComment ' + err);
    }
}

postsController.commentUpVote = function(req, res) {
    try {
        Post.findById(
            req.params.postId,
            function(err, post) {
                if(err) {
                    return res.status(404).send(
                        'ERROR: postsController.commentUpVote -' +
                        ' While Post.findById() ' + err)
                }

                var index = null;

                post.comments.forEach(element => {
                    if(element.id === req.params.commentId)
                        index = element.__index;
                });

                if(index != null){
                    post.comments[index].votes.upvotes.forEach(element => {
                        if(element.userId === req.user.id)
                            return res.status(200).send("Already voted!");
                    });
    
                    post.comments[index].votes.downvotes.forEach(element => {
                        if(element.userId === req.user.id)
                            return res.status(200).send("Already voted!");
                    });

                    post.comments[index].votes.upvotes.push(
                        {
                            userId: req.user.id
                        }
                    );
                    post.save(
                        function(err, post) {
                            if(err) {
                                return res.status(404).send(
                                    'ERROR: postsController.commentUpVote - ' + 
                                    'While Post.findById() ' + err)
                            }
                            return res.status(200).send(post);
                        }
                    );
                }
                else {
                    return res.status(500).send('ERROR: postController.commentUpVote -' + 
                    'wrong commentId');
                }
               
            }
        )
    }
    catch(err){
        return res.status(500).send('ERROR: postsController.commentUpVote ' + err);
    }
}

postsController.commentDownVote = function(req, res) {
    try {
        Post.findById(
            req.params.postId,
            function(err, post) {
                if(err) {
                    return res.status(404).send(
                        'ERROR: postsController.commentDownVote -' +
                        ' While Post.findById() ' + err)
                }

                var index = null;

                post.comments.forEach(element => {
                    if(element.id === req.params.commentId)
                        index = element.__index;
                });

                if(index != null){
                    post.comments[index].votes.upvotes.forEach(element => {
                        if(element.userId === req.user.id)
                            return res.status(200).send("Already voted!");
                    });
    
                    post.comments[index].votes.downvotes.forEach(element => {
                        if(element.userId === req.user.id)
                            return res.status(200).send("Already voted!");
                    });

                    post.comments[index].votes.downvotes.push(
                        {
                            userId: req.user.id
                        }
                    );
                    post.save(
                        function(err, post) {
                            if(err) {
                                return res.status(404).send(
                                    'ERROR: postsController.commentDownVote - ' + 
                                    'While Post.findById() ' + err)
                            }
                            return res.status(200).send(post);
                        }
                    );
                }
                else {
                    return res.status(500).send('ERROR: postController.commentDownVote -' + 
                    'wrong commentId');
                }
            }
        )
    }
    catch(err){
        return res.status(500).send('ERROR: postsController.commentDownVote ' + err);
    }
}

module.exports = postsController;