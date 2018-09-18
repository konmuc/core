exports.roles = {
    guest: {
        can: [
            'users:view',
            'events:view',
            'posts:view'
        ],
        inherits: []
    },
    user: {
        can: [
            {
                name: 'users/posts:view',
                when: (req, params) => req.user.username
            },
            {
                name: 'users:edit',
                when: (req, params) => req.user.username === req.params.user.username
            },
            {
                name: 'users:create',
                when: (req, params) => req.user.username === req.params.user.username
            },
            {
                name: 'posts:delete',
                when: (req, params) => req.user.username === req.params.user.username
            }
        ],
        inherits: [ 'guest' ]
    },
    admin: {
        can: [
            'users/posts:view',
            'users:edit',
            'posts:delete',
            'events:create',
            'events:edit',
            'events:delete'
        ],
        inherits: [ 'user' ]
    }
};