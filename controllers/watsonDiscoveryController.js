const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const discovery = new DiscoveryV1({
  version: process.env.WATSON_DISCOVERY_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_DISCOVERY_APIKEY,
  }),
  url: process.env.WATSON_DISCOVERY_URL,
});



  let query = async (req, res) => {
    //console.log(request.body);
    if(req.body.text){

      const queryParams = {
        environmentId: 'aa507255-1a53-4ac9-962f-089950dcf089',
        collectionId: 'c179051e-7c62-4330-8a2e-c3d86c26d4d8',
        naturalLanguageQuery: req.body.text,
      };

      try {

        let responseDiscovery = await discovery.query(queryParams);
        console.log(responseDiscovery);

        res.send(responseDiscovery.result);

      } catch (e) {

        console.log(`Error: ${error}`);
        res.send(error);

      } finally {

      }



      discovery.query(queryParams)
        .then(queryResponse => {
          console.log(JSON.stringify(queryResponse, null, 2));
        })
        .catch(err => {
          console.log('error:', err);
        });

    } else {
      res.status(400).send({error: true, message: `Propiedad 'text' no encontrada`});
    }




  };

  module.exports = {
    query
  }
