const UserDetail = require('../models/userdetail');

const userController = function(){}

// Function index [UserDetail]
// Give back a complete list of usernames
userController.index = function(req, res) {
    try{
        UserDetail.find(
            {},
            function(err, users) {
                var userMap = {};

                users.forEach(
                    function(user) {
                        userMap[user.username] = user;
                    }
                );

                return res.status(200).send(userMap);
            }
        )
    }
    catch (err) {
        return res.status(500).send('ERROR:userController.index' + err);
    }
};

// Function specificUserDetails [UserDetail]
// Give back a specific user with all UserDetails
userController.specificUserDetails = function(req, res) {
    try {
        UserDetail.findOne(
            {
                username: req.params.username
            },
            function(err, user) {
                if(err) {
                    return res.status(204).send(err);
                }
                return res.status(200).send(user);
            }
        );
    }
    catch(err) {
        return res.status(500).send('ERROR: userController.specificUserDetails' + err);
    }
};

// Function patchUserDetails [UserDetail]
// Patch / Update the UserDetails with new informations
userController.patchUserDetails = function(req, res) {
    try {
        UserDetail.findOneAndUpdate(
            {
                username: req.params.username
            },
            {
                gender: req.gender,
                firstname: req.firstname,
                lastname: req.lastname,
                email: req.email,
                profilePicture: req.profilePicture,
                motto: req.motto,
                university: req.university,
                cityExcursion: req.cityExcursion,
                professionalExcursion: req.professionalExcursion
            },
            function(err, user) {
                if(err){
                    return res.status(500).send('ERROR: userController.patchUserDetails' + err);
                }
                
                return res.status(204).send('Successfull patch of user profile');
            }
        )
    }
    catch(err) {
        return res.status(500).send('ERROR: userController.patchUserDetails' + err);
    }
} 

// Function createUserDetails [UserDetail]
// Initial create the UserDetails of a user
userController.createUserDetails = function(req, res) {
    try {
        UserDetail.findOne(
            {
                username: req.params.username
            },
            function(err, user) {
                if(!err) {
                    res.status(400).send('User already exists!');
                }
                else {
                    UserDetail.create(
                        {
                            username: req.body.username,
                            gender: req.body.gender,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            profilePicture: req.body.profilePicture,
                            motto: req.body.motto,
                            university: req.body.university,
                            cityExcursion: req.body.cityExcursion,
                            professionalExcursion: req.body.professionalExcursion
                        },
                        function(err, user){
                            if(err) {
                                return res.status(500).send('ERROR: userController.createUserDetails - While UserDetail.create()' + err)
                            }
                            return res.status(200).send();
                        }
                    )
                }
            }
        );
    }
    catch(err) {
        return res.status(500).send('ERROR: userController.createUserDetails' + err);
    }
} 

module.exports = userController;