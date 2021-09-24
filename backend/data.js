import bcrypt from 'bcryptjs'

const data={
    users : [
        {
            name:'Zafar',
            email:'admin@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:true,
        },
      
        {
            name:'neha',
            email:'neha@example.com',
            password:bcrypt.hashSync('abcd',8),
            isAdmin:false
            
        },
        {
            name:'zafu',
            email:'zafu@gmail.com',
            password:bcrypt.hashSync('123',8),
            isAdmin:true
        }
    ],
    products:[
        {
           
            name:'Nike Slim Shirt',
            category:'Shirts',
            image:'../images/p1.jpg',
            price:"120",
            countInStock:10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:"High quality products"
        },
        {
            
            name:'Addidas Shirt',
            category:'Shirts',
            image:'../images/p2.jpg',
            price:"110",
            countInStock:0,
            brand:'Nike',
            rating:1,
            numReviews:13,
            description:"High quality products"
        },
        {
            
            name:'Rebook',
            category:'Shirts',
            image:'../images/p3.jpg',
            price:"20",
            countInStock:10,
            brand:'Nike',
            rating:5,
            numReviews:13,
            description:"High quality products"
        },
        {
            
            name:'Joguar',
            category:'Shirts',
            image:'../images/p4.jpg',
            price:"10",
            countInStock:17,
            brand:'Nike',
            rating:4,
            numReviews:18,
            description:"High quality products"
        },
        {
           
            name:'Urban',
            category:'Shirts',
            image:'../images/p5.jpg',
            price:"100",
            countInStock:6,
            brand:'Nike',
            rating:4.5,
            numReviews:15,
            description:"High quality products"
        },
        {
           
            name:'Urban Cool',
            category:'Shirts',
            image:'../images/p6.jpg',
            price:"100",
            countInStock:20,
            brand:'Nike',
            rating:5,
            numReviews:15,
            description:"High quality products"
        },
    ],
}

export default data;