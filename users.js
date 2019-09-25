var express = require('express');
var router = express.Router();

var db = require('../public/config/dbc.js')


//////// TO DOOOOOOOOOO
router.post('/authorisation_number', function(req, res, next) {

  var token = req.body.token
 // console.log(req.body)
 // console.log(req.body.token)
  console.log(req.body.nomComplet)
  const queryUserPerId = "select * from tokens  t , users u where token = '"+tok
en+"' and u.id_user = t.id_user       "

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    console.log(row);
    const queryUser = "insert into demande_numero (user_to , user_from , demandeur) values (? , ? , ?)"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[req.body.id_user,row[0].id_user,row[0].prenom+' '+row[0].nom],(err,rows,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end()

      })
    }
  }
    else
    {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
      res.end()
    }
  })
});
////////////////////////////////////////
//////// TO DOOOOOOOOOO TO SEEEEEE
router.post('/liste_demande_numero', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)
  const queryUserPerId = "select * from tokens where token = '"+token+"'"
  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select * from  demande_numero where user_to = ? and valide IS NULL"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[row[0].id_user],(err,rows,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end(JSON.stringify(rows))

      })
    }
  }
    else
    {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
      res.end()
    }
  })
});
/////////////////
//////// TO DOOOOOOOO
router.post('/accept_number', function(req, res, next) {

  var token = req.body.token ;
  console.log(req.body) ;
  console.log(req.body.token) ;
  let event = req.body.event ;
  const queryUserPerId = "select * from tokens where token = '"+token+"'"
  db.connexion.query(queryUserPerId,(er,row,field)=>{
    console.log(event);
    let val ;
    if(event == 'a'){
      val = 1 ;
    } else if(event == 'r'){
      val = 0 ;
    }

    const queryUser = "update demande_numero set valide = ? where id_demande = ?"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[val,req.body.id_demande],(err,rows,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end()

      })
    }
  }
    else
    {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
      res.end()
    }
  })
});

//////////e



router.post('/', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)

  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select *  from users u where u.id_user !=? "
    console.log(er);
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[row[0].id_user],(err,rows,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  });
        res.end(JSON.stringify(rows));


      })
    }
  }
    else
    {    console.log(er);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  });
      res.end();
    }
  })
});

/////////// get user by id
router.post('/profil_by_id', function(req, res, next) {
  var token = req.body.token
  var ProfilVisited = req.body.id_user ;
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

         db.connexion.query(queryUserPerId ,(err , rows , fields)=>
         {     console.log(rows);
           if(err){
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  });
            res.end();
           }
           else {

                 const query = " select * from users u  where  u.id_user= ?     "

                 db.connexion.query(query,[ProfilVisited],  (er , row ,field) =>{
                           if (er){
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                            res.setHeader('Access-Control-Allow-Credentials', true);
                            res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  });
                            res.end();
                           }
                           else
                           {
                                  let profileObject = {
                                        nomComplet : null ,
                                        email : null ,
                                        tel : null ,
                                        fonction  : null ,
                                        linkedin  : null  ,
                                        localisation : null ,
                                        canIsee : null

                                  }

                                  profileObject.nomComplet = row[0].prenom+' '+row[0].nom
                                  profileObject.email = row[0].email
                                  profileObject.tel =    row[0].tel
                                  profileObject.fonction = row[0].fonction
                                  profileObject.linkedin = row[0].linkedin
                                  profileObject.localisation = row[0].localisation



                                     const requete = " select * from demande_numero where user_to = ? and user_from = ?  order by id_demande desc "


                                           db.connexion.query(requete ,[ProfilVisited, rows[0].id_user] , (errs , roows , fiields)=>{
                                                  if(errs)
                                                  {
                                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                                    res.setHeader('Access-Control-Allow-Credentials', true);
                                                    res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  });
                                                    res.end();
                                                  }
                                                  else
                                                  {    if ( roows.length > 0)
                                                    {
                                                      let data = JSON.stringify(roows);
                                                      console.log(roows[0]);
                                                       console.log(requete);
                                                      profileObject.canIsee = roows[0].valide;

                                               res.setHeader('Access-Control-Allow-Origin', '*');
                                               res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                               res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                               res.setHeader('Access-Control-Allow-Credentials', true);
                                               res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
                                               res.end(JSON.stringify(profileObject));
                                                    }

                                                    else
                                                     {
                                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                                    res.setHeader('Access-Control-Allow-Credentials', true);
                                                    res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
                                                    res.end('default state');
                                                      }
                                                  }






                                           })

                           }

                 })


           }
         })








});
////////////////////////////



router.post('/profil_by_token', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)

  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select  * from users where id_user =?"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[row[0].id_user],(err,rows,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end(JSON.stringify(rows))

      })
    }
  }
    else
    {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
      res.end()
    }
  })
});

//////// TO DOOOOOOOOOO
router.post('/update', function(req, res, next) {

  var token = req.body.token  ;
  var email = req.body.email  ;
  var tel =  req.body.tel  ;
  var username=  req.body.username ;

  var know = req.body.quoi ;
  console.log(req.body)
  console.log(req.body.token)

  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const allUpdated = "update  users set  email = ? , username = ?  , tel =?   where id_user = ?"


    const UpdatedUsernameAndTels = "update  users set  username= ? , tel =?   where id_user = ?"

    const UpdatedUsernameAndmail = "update  users set  email = ? , username = ?    where id_user = ?"

    const UpdatedMail = "update  users set  email = ?  where id_user = ?"

    const UpdatedUsername = "update  users set  username = ?  where id_user = ?"

    const UpdatedMailTel = "update  users set  email = ? ,  tel =?   where id_user = ?"

    const UpdatedTel = "update  users set   tel =?   where id_user = ?"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
     if(know  == 'allUpdated' ){
      db.connexion.query(allUpdated,[email,username,tel,row[0].id_user],(err,rows,fields)=>{

        if(err){
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
          res.end()
        } else {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(200, {'Content-Type': 'multipart/form-data'  , 'state' : 'updated'})
          res.end('All is allUpdated');

        }

      })
     } else if(know  == 'UpdatedUsernameAndTels' ){
      db.connexion.query(UpdatedUsernameAndTels,[username,tel,row[0].id_user],(err,rows,fields)=>{



        if(err){
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
          res.end()
        } else {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(200, {'Content-Type': 'multipart/form-data'  , 'state' : 'updated'})
          res.end('UpdatedUsernameAndTels');
        }

     } ) }
     else if(know  == 'UpdatedUsernameAndmail' ){
      db.connexion.query(UpdatedUsernameAndmail,[email,username,row[0].id_user],(err,rows,fields)=>{


      if(err){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
        res.end()
      }
   else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.writeHead(200, {'Content-Type': 'multipart/form-data'  , 'state' : 'updated'})
    res.end('UpdatedUsernameAndmail');
   }








     } ) }
     else if(know  == 'UpdatedMail' ){
      db.connexion.query(UpdatedMail,[email,row[0].id_user],(err,rows,fields)=>{


         if(err){
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
          res.end()
         }

        else {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(200, {'Content-Type': 'multipart/form-data'  , 'state' : 'updated'})
          res.end('UpdatedMail');
        }


     } ) }
     else if(know  == 'UpdatedUsername' ){
      db.connexion.query(UpdatedUsername,[username,row[0].id_user],(err,rows,fields)=>{

          if ( err){
            res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
        res.end()
          }

          else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.writeHead(200, {'Content-Type': 'multipart/form-data'  , 'state' : 'updated'})
            res.end('UpdatedUsername');
          }






     } ) }
     else if(know  == 'UpdatedMailTel' ){
      db.connexion.query(UpdatedMailTel,[email,tel,row[0].id_user],(err,rows,fields)=>{
       if(err){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
        res.end()
       }else {

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.writeHead(200, {'Content-Type': 'multipart/form-data'  , 'state' : 'updated'})
            res.end('UpdatedMailTel');

     }  }) }
     else if(know  == 'UpdatedTel' ){
      db.connexion.query(UpdatedTel,[tel,row[0].id_user],(err,rows,fields)=>{
        if(err){
          console.log(err);
          console.log(know)
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
          res.end()
        } else {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(200, {'Content-Type': 'multipart/form-data'  , 'state' : 'updated'})
          res.end('UpdatedTel');
        }

     } ) }
    }   }
    else
    {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
      res.end()
    }

















  })
});
/////



module.exports = router;
