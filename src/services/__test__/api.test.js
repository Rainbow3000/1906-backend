require('dotenv').config(); 

const mongoose = require('mongoose'); 

const authService = require('../authService')
const productService = require('../productService')
beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URL)
},30000)



describe('test api', ()=>{
    test('login',async()=>{
      const res = await authService.login({
        email:"nguyenducthinh0401@gmail.com",
        password:'12345678'
      })
      expect(res).toBe('login success')
    })

    test('test single product', async()=>{
        const data = await productService.getSingleProduct('629a14b4eccdabaeb8673502');
        expect(data).not.toBeNull()
    })

    test('test register',async()=>{
        const user = await authService.register({
            userName: "tien",
            email: "tienluuvan2001@gmail.com",
            password: "12345678"
        })
        expect(user).not.toBeNull();
    })

})

afterAll(async()=>{
    await mongoose.connection.close();
})

