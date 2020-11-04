const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauce');


router.get('/', auth, saucesCtrl.getAllSauce);

router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth,  multer, saucesCtrl.modifySauce);
<<<<<<< HEAD
<<<<<<< HEAD
router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);
=======
router.delete('/:id', auth, saucesCtrl.deleteSauce);
>>>>>>> 7a67a56... routers modifysauces with multer
=======
router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);
>>>>>>> feff61f... another multer
router.post("/:id/like", auth, saucesCtrl.likeSauce);

module.exports = router;