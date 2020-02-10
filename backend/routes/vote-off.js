const router = require('express').Router()
let User = require('../models/users.models')

router.route('/').get((req, res)=>{
    console.log('hello-world')
})