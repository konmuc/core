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
                when: (req, params) => req.user.username === params.username
            },
            {
                name: 'users:edit',
                when: (req, params) => req.user.username === params.username
            },
            {
                name: 'users:create',
                when: (req, params) => req.user.username === params.username
            },
            {
                name: 'posts:delete',
                when: (req, params) => req.user.username === params.username
            }
        ],
        inherits: [ 'guest' ]
    },
    admin: {
        can: [
            {
                name: 'users/posts:view',
                when: (req) => req.user.isAdmin
            },
            {
                name: 'users:edit',
                when: (req) => req.user.isAdmin
            },
            {
                name: 'posts:delete',
                when: (req) => req.user.isAdmin
            }
        ],
        inherits: [ 'user' ]
    }
};