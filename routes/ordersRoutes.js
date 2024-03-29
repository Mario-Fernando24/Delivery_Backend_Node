const ordersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/orders/create',passport.authenticate('jwt',{session:false})  ,ordersController.create);
    app.get('/api/orders/findByStatus/:status',passport.authenticate('jwt',{session:false})  ,ordersController.findByStatus);
    app.put('/api/orders/updateToDespachado',passport.authenticate('jwt',{session:false})  ,ordersController.updateToDespachado);
    app.put('/api/orders/updateToIniciandoEntrega',passport.authenticate('jwt',{session:false})  ,ordersController.updateToIniciandoEntrega);
    app.put('/api/orders/updatePosicionDomiciliarioLatLng',passport.authenticate('jwt',{session:false})  ,ordersController.updatePosicionDomiciliarioLatLng);
    app.put('/api/orders/updateToFinalizarEntregaDelivery',passport.authenticate('jwt',{session:false})  ,ordersController.updateToFinalizarEntregaDelivery);

    app.get('/api/orders/findByDeliveryIdStatus/:id_domiciliario/:status',passport.authenticate('jwt',{session:false})  ,ordersController.findByDeliveryIdStatus);
    app.get('/api/orders/findByClientIdStatus/:id_client/:status',passport.authenticate('jwt',{session:false})  ,ordersController.findByClientIdStatus);

    
    
    
}