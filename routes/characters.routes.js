const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters.hbs", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/create-new", (req, res, next) => {
  res.render("characters/create-character.hbs");
});

router.get("/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character.hbs", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.post("/create", (req, res, next) => {
  axios
    .post("https://ih-crud-api.herokuapp.com/characters", {
      name: req.body.name,
      occupation: req.body.occupation,
      weapon: req.body.weapon,
      isAcartoon: req.body.isAcartoon,
    })
    .then((createdCharacter) => {
      console.log(createdCharacter.data, "CREATED CHARACTER");
      res.redirect(`/characters/${createdCharacter.data.id}`);
    })
    .catch((err) => console.error(err));
});

router.get('/:id/edit', (req, res, next) => {
    res.render('characters/edit-character.hbs')
})

router.post('/:id/update', (req, res, next) => {
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(updatedCharacter => {
        res.redirect('/:id', { character: updatedCharacter.data })
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

router.post('/:id/delete', (req, res, next) => {
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(res.redirect('/'))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
