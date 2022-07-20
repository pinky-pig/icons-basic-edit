const express = require('express')
const router = express.Router()
// const { rule, option } = require('../data/formJSON')

router.post('/test', function (req, res) {
  let result = 'test'
  res.send(result)
})

async function getIcon(){
  const { lookupCollections, locate } = require('@iconify/json')
  const iconSets = await lookupCollections();
  const prefixes = Object.keys(iconSets);

  // 所有的icon
    prefixes
      .map((prefix) => {
        const item = iconSets[prefix];
        // prefix: name (total icons)
        return prefix + ': ' + item.name + ' (' + item.total + ' icons)';
      })
      .join('\n')

  // Get location of Taber Icons JSON file
  // const tabler = locate('tabler');
  // console.log('taler icon 所在的路径', tabler);
  const carbon = locate('carbon');
  // console.log('taler icon 所在的路径', carbon);
  return carbon
}

router.get('/fetchSvgFromIconify', async function (req, res) {
  let path =  await getIcon()
  const file = require(path)
  res.send(file)
})
module.exports = router

