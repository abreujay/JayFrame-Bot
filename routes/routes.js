const {Router} = require('express')
const router = Router()

router.get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  
  router.head('/health', (req, res) => {
    res.sendStatus(200);
  });
  

module.exports = router