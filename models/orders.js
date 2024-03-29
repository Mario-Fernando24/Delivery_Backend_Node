//obtengo la base de dato
const db = require('../config/config');

const Order = {};


Order.findByStatus=(status,result)=>{

    const sql = `SELECT 
    CONVERT(O.id, CHAR) AS id,
    CONVERT(O.id_client, CHAR) AS id_client,
    CONVERT(O.id_direccion, CHAR) AS id_direccion,
    CONVERT(O.id_domiciliario, CHAR) AS id_domiciliario,
      O.statu,
      O.timetamp,
      A.direccion,
      O.lat,
      O.lng,
    
    JSON_OBJECT(
             'id', CONVERT(A.id, CHAR),
             'direccion', A.direccion,
             'nombreBarrio', A.nombre_barrio,
             'lat', A.lat,
             'lng', A.lng
         
     ) AS direccion_json,
     
    JSON_OBJECT(
             'id', CONVERT(U.id, CHAR),
             'name', U.name,
             'lastname', U.lastname,
             'image', U.image,
             'phone',U.phone
         
     ) AS cliente_json,
       
       JSON_OBJECT(
                'id', CONVERT(UDOMI.id, CHAR),
                'name', UDOMI.name,
                'lastname', UDOMI.lastname,
                'image', UDOMI.image,
                'phone',UDOMI.phone
            
        ) AS domiciliario_json,

        

    JSON_ARRAYAGG(
            JSON_OBJECT(
                 'id', CONVERT(P.id, char),
                 'name', P.name,
                 'description', P.description,
                 'image1', P.image1,
                 'image2', P.image2,
                 'image3', P.image3,
                 'price', P.price,
                 'quantity', OrdensProduct.cantidad
             )
            ) AS produc
      
        FROM orders AS O

            INNER JOIN users AS U
            ON U.id = O.id_client    
            INNER JOIN address AS A 
            ON A.id = O.id_direccion    
            LEFT JOIN users AS UDOMI
            ON UDOMI.id = O.id_domiciliario  
            INNER JOIN orders_has_product AS OrdensProduct
            ON OrdensProduct.id_order=O.id
            INNER JOIN products  AS P
            ON P.id = OrdensProduct.id_product    
            WHERE O.statu = ?
            GROUP BY O.id

         `;

         db.query(
            sql,
            status,
            (err, data) => {
                if (err) {
                    // console.log('Error:', err);
                    result(err, null);
                }
                else {
                    // console.log('dataaaaaa', data);
                    result(null, data);
                }
            }
          )   

},



//listar las ordenes en el rol domiciliario
Order.ordersDomiciliarioIdStatus=(id_domiciliario, status, result)=>{


    const sql = `SELECT 
    CONVERT(O.id, CHAR) AS id,
    CONVERT(O.id_client, CHAR) AS id_client,
    CONVERT(O.id_direccion, CHAR) AS id_direccion,
    CONVERT(O.id_domiciliario, CHAR) AS id_domiciliario,
      O.statu,
      O.timetamp,
      A.direccion,
      O.lat,
      O.lng,
    
    JSON_OBJECT(
             'id', CONVERT(A.id, CHAR),
             'direccion', A.direccion,
             'nombreBarrio', A.nombre_barrio,
             'lat', A.lat,
             'lng', A.lng
         
     ) AS direccion_json,
     
    JSON_OBJECT(
             'id', CONVERT(U.id, CHAR),
             'name', U.name,
             'lastname', U.lastname,
             'image', U.image,
             'phone',U.phone
         
     ) AS cliente_json,
       
       JSON_OBJECT(
                'id', CONVERT(UDOMI.id, CHAR),
                'name', UDOMI.name,
                'lastname', UDOMI.lastname,
                'image', UDOMI.image,
                'phone',UDOMI.phone
            
        ) AS domiciliario_json,

        

    JSON_ARRAYAGG(
            JSON_OBJECT(
                 'id', CONVERT(P.id, char),
                 'name', P.name,
                 'description', P.description,
                 'image1', P.image1,
                 'image2', P.image2,
                 'image3', P.image3,
                 'price', P.price,
                 'quantity', OrdensProduct.cantidad
             )
            ) AS produc
      
        FROM orders AS O

            INNER JOIN users AS U
            ON U.id = O.id_client    
            INNER JOIN address AS A 
            ON A.id = O.id_direccion    
            LEFT JOIN users AS UDOMI
            ON UDOMI.id = O.id_domiciliario  
            INNER JOIN orders_has_product AS OrdensProduct
            ON OrdensProduct.id_order=O.id
            INNER JOIN products  AS P
            ON P.id = OrdensProduct.id_product    
            WHERE  O.id_domiciliario=? AND  O.statu = ?
            GROUP BY O.id
         `;

         db.query(
            sql,
           [ id_domiciliario,
            status],
            (err, data) => {
                if (err) {
                    // console.log('Error:', err);
                    result(err, null);
                }
                else {
                    // console.log('dataaaaaa', data);
                    result(null, data);
                }
            }
          )   

},



            //listar las ordenes en el rol client
            Order.findByClientIdStatu=(id_client, status, result)=>{

                
                const sql = `SELECT 
                CONVERT(O.id, CHAR) AS id,
                CONVERT(O.id_client, CHAR) AS id_client,
                CONVERT(O.id_direccion, CHAR) AS id_direccion,
                CONVERT(O.id_domiciliario, CHAR) AS id_domiciliario,
                  O.statu,
                  O.timetamp,
                  A.direccion,
                  O.lat,
                  O.lng,
                
                JSON_OBJECT(
                         'id', CONVERT(A.id, CHAR),
                         'direccion', A.direccion,
                         'nombreBarrio', A.nombre_barrio,
                         'lat', A.lat,
                         'lng', A.lng
                     
                 ) AS direccion_json,
                 
                JSON_OBJECT(
                         'id', CONVERT(U.id, CHAR),
                         'name', U.name,
                         'lastname', U.lastname,
                         'image', U.image,
                         'phone',U.phone
                     
                 ) AS cliente_json,
                   
                   JSON_OBJECT(
                            'id', CONVERT(UDOMI.id, CHAR),
                            'name', UDOMI.name,
                            'lastname', UDOMI.lastname,
                            'image', UDOMI.image,
                            'phone',UDOMI.phone
                        
                    ) AS domiciliario_json,
            
                    
            
                JSON_ARRAYAGG(
                        JSON_OBJECT(
                             'id', CONVERT(P.id, char),
                             'name', P.name,
                             'description', P.description,
                             'image1', P.image1,
                             'image2', P.image2,
                             'image3', P.image3,
                             'price', P.price,
                             'quantity', OrdensProduct.cantidad
                         )
                        ) AS produc
                  
                    FROM orders AS O
            
                        INNER JOIN users AS U
                        ON U.id = O.id_client    
                        INNER JOIN address AS A 
                        ON A.id = O.id_direccion    
                        LEFT JOIN users AS UDOMI
                        ON UDOMI.id = O.id_domiciliario  
                        INNER JOIN orders_has_product AS OrdensProduct
                        ON OrdensProduct.id_order=O.id
                        INNER JOIN products  AS P
                        ON P.id = OrdensProduct.id_product    
                        WHERE  O.id_client=? AND  O.statu = ?
                        GROUP BY O.id
                     `;
            
                     db.query(
                        sql,
                       [ id_client,
                        status],
                        (err, data) => {
                            if (err) {
                                // console.log('Error:', err);
                                result(err, null);
                            }
                            else {
                                // console.log('dataaaaaa', data);
                                result(null, data);
                            }
                        }
                      )   
            
            },
            





//crear pedido
Order.create=(order, result)=>{
   

    const sql = `
    INSERT INTO
    orders(
        id_client,
        id_direccion,
        statu,
        timetamp,
        created_at,
        updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?)
`;
db.query(
    sql,
    [order.id_client,
     order.id_direccion,
     'PAGADO', //1: pagado, 2: despachado,  3: en camino 4: entregado
     Date.now(),
     new Date(),
     new Date()],
    (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        }
        else {
            // console.log('Id de la nueva orden del pedido=> ', res.insertId);
            result(null, res.insertId);
        }
    }
  )   
 },

 //Metodo para cambiar el estado a despachado de la orden por parte del restaurante
 Order.updateToDespachado=(id_orden, id_domiciliario, result)=>{
     
    const sql = `
         UPDATE 
          orders
         SET     
            id_domiciliario=?,
            statu=?,
            updated_at=?
         WHERE 
            id=?  
        `;

        db.query(
            sql,
            [
              id_domiciliario,
              "DESPACHADO",
              new Date(),
              id_orden
            ],
            (err, res) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, id_orden);
                }
            }
        )

 },

 //METODO PARA INICIAR LA ENTREGA DEL PEDIDO POR PARTE DEL DOMICILIARIO
 Order.updateToEntregado=(id_orden, result)=>{
     
    const sql = `
         UPDATE 
          orders
         SET     
            statu=?,
            updated_at=?
         WHERE 
            id=?  
        `;

        db.query(
            sql,
            [
              "EN CAMINO",
              new Date(),
              id_orden
            ],
            (err, res) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, id_orden);
                }
            }
        )

 },


 Order.updateToFinalizarEntregaDelivery=(id_orden, result)=>{
     
    const sql = `
         UPDATE 
          orders
         SET     
            statu=?,
            updated_at=?
         WHERE 
            id=?  
        `;

        db.query(
            sql,
            [
              "ENTREGADO",
              new Date(),
              id_orden
            ],
            (err, res) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, id_orden);
                }
            }
        )

 },


  //METODO PARA IR ACTUALIZANDO LA POSICION DEL DOMICILIARIO
  Order.updatePosicionDomiciliarioLatLng=(id_orden,lat, lng, result)=>{
     
    
    const sql = `
         UPDATE 
          orders
         SET     
         lat=?,
         lng=?,
         updated_at=?
         WHERE 
            id=?  
        `;

        db.query(
            sql,
            [
              lat,
              lng,
              new Date(),
              id_orden
            ],
            (err, res) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, id_orden);
                }
            }
        )

 },

 
module.exports = Order;
