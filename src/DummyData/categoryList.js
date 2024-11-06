const categoryDataList = [
    {
        _id: 0,
        name: 'Consultancy Services',
        description: 'Consultancy services are designed to help businesses improve their performance and grow by solving problems and finding new and better ways of doing things.',
        numBusiness: 590,
        subcategories: [
            { _id: 1, name: 'Business', numBusiness: 10, description: 'Business consultants provide management consulting to help organizations improve performance and efficiency. These professionals analyze businesses and create solutions while also helping companies meet their goals.' },
            { _id: 2, name: 'IT', numBusiness: 40, description: 'IT consultants provide organizations with best practices for using IT solutions and services for their business objectives and in solving their problems.' },
            { _id: 3, name: 'Job/Recruitment', numBusiness: 103, description: 'Recruitment consultants help companies fill their vacancies and help candidates find jobs.' },
            { _id: 4, name: 'Education', numBusiness: 140, description: 'Education consultants help students and parents make informed decisions about their education.' },
            { _id: 5, name: 'Health', numBusiness: 46, description: 'Health consultants help healthcare organizations improve their performance and efficiency.' },
            { _id: 6, name: 'Legal', numBusiness: 25, description: 'Legal consultants provide legal advice to businesses and individuals.' },
            { _id: 7, name: 'Finance', numBusiness: 13, description: 'Finance consultants help businesses improve their financial performance.' },
            { _id: 8, name: 'Marketing', numBusiness: 17, description: 'Marketing consultants help businesses improve their marketing strategies.' },
            { _id: 9, name: 'Real Estate', numBusiness: 11, description: 'Real estate consultants help businesses improve their real estate strategies.' },
            { _id: 10, name: 'Travel', numBusiness: 99, description: 'Travel consultants help businesses improve their travel strategies.' },
            { _id: 11, name: 'Other', numBusiness: 70, description: 'Other consultants provide services that do not fall into the other categories.' }
        ],
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        _id: 12,
        name: 'Distribution',
        description: 'Distribution is the process of making a product or service available to the people who need or want it.',
        numBusiness: 30,
        subcategories: [
            { _id: 13, name: 'Wholesale Distribution', numBusiness: 20, description: 'Wholesale distribution is the process of selling goods in large quantities to be retailed by others.' },
            { _id: 14, name: 'Retail Distribution', numBusiness: 10, description: 'Retail distribution is the process of selling consumer goods or services to customers through multiple channels of distribution to earn a profit.' }
        ],
        image: "https://plus.unsplash.com/premium_photo-1663040001568-f07cab70d71f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        _id: 15,
        name: 'Manufacturing',
        description: 'Manufacturing is the process of producing goods from raw materials or components.',
        numBusiness: 33,
        subcategories: [
            { _id: 16, name: 'Consumer Goods', numBusiness: 20, description: 'Consumer goods are products that are purchased for consumption by the average consumer.' },
            { _id: 17, name: 'Industrial Goods', numBusiness: 13, description: 'Industrial goods are products that are purchased by companies to be used in their business operations.' }
        ],
        image: "https://plus.unsplash.com/premium_photo-1682144509812-4734c830b486?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        _id: 18,
        name: 'Retail',
        description: 'Retail is the process of selling consumer goods or services to customers through multiple channels of distribution to earn a profit.',
        numBusiness: 66,
        subcategories: [
            { _id: 19, name: 'Online Retail', numBusiness: 30, description: 'Online retail is the process of selling consumer goods or services to customers through the internet.' },
            { _id: 20, name: 'Physical Stores', numBusiness: 36, description: 'Physical stores are retail locations where customers can purchase goods or services in person.' }
        ],
        image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        _id: 21,
        name: 'Wholesale',
        description: 'Wholesale is the process of selling goods in large quantities to be retailed by others.',
        numBusiness: 80, 
        subcategories: [
            { _id: 22, name: 'B2B Wholesale', numBusiness: 50, description: 'B2B wholesale is the process of selling goods in large quantities to be retailed by other businesses.' },
            { _id: 23, name: 'B2C Wholesale', numBusiness: 30, description: 'B2C wholesale is the process of selling goods in large quantities to be retailed by consumers.' }
        ],
        image: "https://plus.unsplash.com/premium_photo-1682144857455-076765b9fe1a?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];


export default categoryDataList;