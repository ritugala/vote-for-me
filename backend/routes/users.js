const router = require('express').Router()
let User = require('../models/users.models')
var all_usernames = []

function getAllUsers()
{
    User.find()
        .then(users=>all_usernames.push(users))
        .catch(err=>console.log('Errorrrr'+err))
    all_usernames.map(user=>user.username)
    console.log(all_usernames)
    return all_usernames
}
router.route('/').get((req, res)=>{
    User.find()
       .then(users=>res.json(users))
       .catch(err=>res.status(400).json('Errorrrr: '+err))
})

router.route('/add').post((req, res)=>{
    const username = req.body.username;
    const bio = req.body.bio;
    const votes = 0;
    const img = req.body.img;
    const newUser = new User({username, bio, votes, img})
    newUser.save()
       .then(()=>res.json('User added successfully'))
       .catch(err=>res.status(400).json('Errorrrr '+ err))
})



router.route('/:id').get((req, res)=>{
    User.findById(req.params.id)
       .then(user=>res.json(user))
       .catch(err=>res.status(400).json('Errorrr'+ err))
})

router.route('/chosen/:id').post((req, res)=>{
    User.findById(req.params.id)
      .then(user=>{
          user.username = req.body.username;
          user.bio = req.body.bio;
          user.img = req.body.img;
          user.votes = Number(req.body.votes);
          for(var i=0; i<all_usernames.length; i++)
          {
              user.other_users[i] = res.body.bool
          }
          user.save()
             .then(()=>res.json('User updated'))
             .catch(err=>res.status(400).json('Errorr: '+ err))
      })
      .catch(err=>res.status(400).json('Errorr: '+ err))
})

router.route('/other_users/:id').post((req, res)=>{
    User.findById(req.params.id)
      .then(user=>{

          user.username = req.body.username;
          user.bio = req.body.bio;
          user.img = req.body.img;
          user.votes = Number(req.body.votes);
          user.save()
             .then(()=>res.json('User updated'))
             .catch(err=>res.status(400).json('Errorr: '+ err))
      })
      .catch(err=>res.status(400).json('Errorr: '+ err))
})

router.route('/update/:id').post((req, res)=>{
    User.findById(req.params.id)
      .then(user=>{
          user.username = req.body.username;
          user.bio = req.body.bio;
          user.img = req.body.img;
          user.save()
             .then(()=>res.json('User updated'))
             .catch(err=>res.status(400).json('Errorr: '+ err))
      })
      .catch(err=>res.status(400).json('Errorr: '+ err))
})

router.route('/:id').delete((req, res)=>{
    User.findByIdAndDelete(req.params.id)
       .then(()=>res.json('User Deleted'))
       .catch(err=>res.status(400).json('Errorrr'+ err))
})

module.exports = router;