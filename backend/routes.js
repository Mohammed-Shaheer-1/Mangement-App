const express = require('express')
const router = express.Router()
const objectId = require('mongoose').Types.ObjectId
const db = require('./db.js')
const authservice = require('./authservice')

//update employee
router.put('/:id', (req, res) => {
    if (objectId.isValid(req.params.id)) {
        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        }

        db.employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
            if (err) {
                console.log("update employee errorr" + err);
            } else {
                res.send(data)
            }
        })
    } else {
        return res.status(404).send("not found in the id")
    }
})

//deleat single emplyee
router.delete('/:id', (req, res) => {
    if (objectId.isValid(req.params.id)) {
        db.employee.findByIdAndRemove(req.params.id, (err, data) => {
            if (err) {
                console.log("deleat employee errorr" + err);
            } else {
                res.send(data)
            }
        })
    } else {
        return res.status(404).send("not found in the id")
    }
})

//GET single employee
router.get('/:id', (req, res) => {
    if (objectId.isValid(req.params.id)) {
        db.employee.findById(req.params.id, (err, data) => {
            if (err) {
                console.log("get employee errorr" + err);
            } else {
                res.send(data)
            }
        })
    } else {
        return res.status(404).send("not found in the id")
    }
})

//GET api
router.get('/', (req, res) => {
    db.employee.find((err, doc) => {
        if (err) {
            console.log("get metherd error" + err);
        } else {
            res.send(doc)
            console.log(objectId);
        }
    })
})

router.post('/', (req, res) => {
    let emp = new db.employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    })
    emp.save((err, dd) => {
        if (err) {
            console.log("errrr post data");
        } else {
            console.log(dd);
            res.send(dd)
            console.log(dd._id.toString());
        }
    })
})

router.post('/register', (req, res) => {

    authservice.register(
      req.body.name,
   req.body.email,
    req.body.password
    )
        .then((result) => {
            res.status(result.statusCode), res.json(result)
        })

})
router.post('/login',(req,res)=>{
  authservice.login(req.body.email,req.body.password)
    .then((auth)=>{
        res.status(auth.statusCode),res.json(auth)
    })
})


module.exports = router