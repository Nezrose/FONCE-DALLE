const menus = [
    {
        id: 1,
        name: 'Home',
        links: '/',
    },
    {
        id: 2,
        name: 'produits',
        links: '/produits'
    },{
        id: 3,
        name: 'Collections',
        links: '/collections'
    },
    {
        id: 4,
        name: 'Contact',
        links: '#',
        namesub: [
            {
                id: 1,
                sub: 'Team',
                links: '/team'
            },
            {
                id: 2,
                sub: 'Road Map',
                links: '/road-map'
            },
            {
                id: 3,
                sub: 'Our Mission',
                links: '/our-mission'
            },
            {
                id: 4,
                sub: 'Blog List',
                links: '/blog-list'
            },
        ]
    },
    
]

export default menus;