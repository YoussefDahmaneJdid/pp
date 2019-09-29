var express = require('express');
var router = express.Router();
var multer      = require('multer');
var db = require('../public/config/dbc.js')
var fs = require('fs'),
http = require("http"),
path = require("path"),
url = require("url"),
upload = require("express-fileupload")

function getFile(exists, response, localpath)
{
  if(!exists) return sendError(404, '404 Not Found', response);
  fs.readFile(localpath, "binary",
   function(err, file){ sendFile(err, file, response);});
}



function getFilename(request, response)
{
  var urlpath = url.parse(request.url).pathname; // following domain or IP and port
  var localpath = path.join(process.cwd(), urlpath); // if we are at root
  fs.exists(localpath, function(result) { getFile(result, response, localpath)});
}

function sendError(errCode, errString, response)
{
  response.writeHead(errCode, {"Content-Type": "text/plain"});
  response.write(errString + "\n");
  response.end();
  return;
}

function sendFile(err, file, response)
{
  if(err) return sendError(500, err, response);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
  res.setHeader('Access-Control-Allow-Credentials', true);
  response.writeHead(200);
  response.write(file, "binary");
  response.end();
}



function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync("C:/Users/zbook/COMDATA_APP/public/images/"+file);
  
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}





router.post('/', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select   p.* , u.nom , u.prenom , u.img_profil , case when l.id_users = ? then 'liked' else   'not liked'  end as 'like'\
    from publication_francais p , users u , like_publication l where u.id_user = p.id_publisher and  (l.id_publication = p.id or p.id not in (select id_publication from like_publication)) order by p.id desc limit 10"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
                          

          







      db.connexion.query(queryUser,[row[0].id_user],(err,rows,fields)=>{
        if(!err){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        console.log(err)
        res.end(JSON.stringify(rows))
      } else console.log(err);


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

/// TO DOOOOOOOOOOOOOO
router.post('/publication_by_id_ancien', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select p.* , u.nom , u.prenom , u.img_profil , case when l.id_users = ? then 'liked' else   'not liked'  end as 'like'\
    from publication_francais p , users u , like_publication l where u.id_user = p.id_publisher and  (l.id_publication = p.id or p.id not in (select id_publication from like_publication)) and p.id < ? order by p.id desc limit 10"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[req.body.id_pub],(err,rows,fields)=>{
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


/////////////////////
/// TO DOOOOOOOOOOOOOO     get profil likers posts
router.post('/publication_get_likers', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select u.nom , u.prenom , u.img_profil from users u , like_publication lp \
    where u.id_user = lp.id_users and lp.id_publication = ?"
    if(!er)
    
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[req.body.id_pub],(err,rows,fields)=>{
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


/// /////////////////////


router.post('/publication_by_id_nouveau', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select p.* , u.nom , u.prenom , u.img_profil , case when l.id_users = ? then 'liked' else   'not liked'  end as 'like'\
    from publication_francais p , users u , like_publication l where u.id_user = p.id_publisher and  (l.id_publication = p.id or p.id not in (select id_publication from like_publication)) and p.id > ? order by p.id asc limit 10"
    if(!er)
    
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[req.body.id_pub],(err,rows,fields)=>{
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

//////////  TO DOOOOOOOOOOOOO
router.post('/add_like', function(req, res, next) {

  var token = req.body.token
  var id_pub = req.body.id_pub
  var like
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    if(row.length)
    {
    const queryUser = "select * from like_publication where id_users = ? and id_publication = ?"
    
     
      db.connexion.query(queryUser,[row[0].id_user,id_pub],(err,rows,fields)=>{
       if(rows.length){
        like = "dislike"
        const nbrlike = "delete from like_publication where id_publication = ? and id_users = ?"
        db.connexion.query(nbrlike,[id_pub , row[0].id_user],(err,rows2,fields)=>{
          const nbrlike = "select count(*) as count from like_publication where id_publication = ? "
      db.connexion.query(nbrlike,[id_pub],(err,rows3,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end(JSON.stringify({'count' : rows3[0].count , 'status' : like}))
        });
          });
        }
      else
      {


        like = "like"
        const nbrlike = "insert into like_publication (id_publication , id_users) values (?,?)"
        db.connexion.query(nbrlike,[id_pub , row[0].id_user],(err,rows2,fields)=>{
          const nbrlike = "select count(*) as count from like_publication where id_publication = ? "
      db.connexion.query(nbrlike,[id_pub],(err,rows3,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end(JSON.stringify({'count' : rows3[0].count , 'status' : like}))
        });
         });

     
      }
      })    
      }
    else 
    {
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
      res.end()
    }
  })
});
/////////////////

////// TOOOO DOOOOOOOOOOOOO

router.post('/add_share', function(req, res, next) {

  var token = req.body.token
  var id_pub = req.body.id_pub
  var like
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    if(row.length)
    {
    const queryUser = "select * from share_publication where id_users = ? and id_publication = ?"
    
     
      db.connexion.query(queryUser,[row[0].id_user,id_pub],(err,rows,fields)=>{
       if(rows.length){
         like = "already shared"
        const nbrlike = "select count(*) as count from share_publication where id_publication = ? "
      db.connexion.query(nbrlike,[id_pub],(err,rows3,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end(JSON.stringify({'count' : rows3[0].count , 'status' : like}))
        });
        }
      else
      {


        like = "share"
        const nbrlike = "insert into share_publication (id_publication , id_users) values (?,?)"
        db.connexion.query(nbrlike,[id_pub , row[0].id_user],(err,rows2,fields)=>{
          const nbrlike = "select count(*) as count from share_publication where id_publication = ? "
      db.connexion.query(nbrlike,[id_pub],(err,rows3,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end(JSON.stringify({'count' : rows3[0].count , 'status' : like}))
        });
         });

     
      }
      })

    
      }
    else 
    {
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN'  })
      res.end()
    }
  })
});

/////// TOO DOOOOOOOO 

router.post('/add_pub', function(req, res, next) {

 /* var token = req.body.token
  var contenu_text = req.body.contenu_text
  //var contenu_multimedia = req.body.contenu_multimedia
  var contenu_type = req.body.contenu_type
  var contenu_titre = req.body.contenu_titre
  var file = req.body.file
  var name = ""
  /*
  
  console.log(contenu_text);
  console.log(contenu_type); */
 
 // console.log(file);
    /*  uploadpath =""
    
      if(contenu_type == "img")
      {

         uploadpath = '/COMDATA_APP/public/images'
         var base64Data = req.body.file.replace(/^data:image\/jpeg;base64,/, "");
     console.log(base64Data);
         var time = Date.now().toString()+"out.jpeg" ;
fs.writeFile('public/images'+"/"+time, base64Data, 'base64', function(err) {
  console.log(err);
});
      }
      else if (contenu_type == "video")
      {
         uploadpath = __dirname+'/videos/'+name
      }
      else
      {
        uploadpath = __dirname+'/files/'+name
      }      */
     
  
 
  //console.log(req.body)
 //console.log(req.body.token)
 console.log(req.files);
 console.log('////////////////////////////////////////////////')
 console.log(req.file);
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "INSERT INTO `publication_francais` \
    ( `content_text`, `content`, `content_type`, `date_pub`, `nbr_like`, `id_publisher`, `nbr_share`, `updated_date`, `deleted_at`, `titre`)\
     VALUES ( ?, ?, ?, NOW(), 0, ?, 0, NULL, NULL, ?);"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[contenu_text,time,contenu_type,row[0].id_user,contenu_titre],(err,rows,fields)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
        res.end()
      })
    }
    else
    {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN' })
      res.end()
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
///////////////////////////













router.post('/publication_by_me', function(req, res, next) {

  var token = req.body.token ;
  console.log(req.body);
  console.log(req.body.token);
  var publications ;
  var likes ;
  var ListfinalPublications  =[] ;
 
  const queryUserPerId = "select * from tokens t , users u where token = '"+token+"'  and   t.id_user = u.id_user "
    
  db.connexion.query(queryUserPerId,(er,row,field)=>{


    
    const queryUser = "select   * from publication_francais p, users u where  p.id_publisher = u.id_user"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
                          
                             
          







      db.connexion.query(queryUser,(err,rows,fields)=>{
        if(!err){
        //  console.log(rows);
          publications = rows ;

          const queryLikers = "select  * from like_publication "
                         
                       db.connexion.query(queryLikers,(errr,rowss,fields)=>{
                            if(errr){
                              res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'ERROR SERVER'  })
          res.end()
                            }else{

                             likes = rowss ;

                              

                                  for(var i = 0 ; i< publications.length ;i++){
                                    let publication = {
                                      id : null ,
                                      content_text : null ,
                                      content : null , 
                                      content_type : null , 
                                      date_pub : null ,
                                      id_publisher :null ,
                                      titre : null ,
                                      nombreLike : 0 ,
                                      persLikers : [] ,
                                      ifLiked : null  ,
                                      fullName : null ,
                                      img_profil : null
                                                          }

                                         publication.id = publications[i].id ;
                                         publication.content_text = publications[i].content_text ;
                                         publication.content = publications[i].content ;
                                         publication.content_type = publications[i].content_type ;
                                         publication.date_pub = publications[i].date_pub ;
                                         publication.id_publisher = publications[i].id_publisher ;
                                         publication.titre = publications[i].titre ;
                                         publication.fullName = publications[i].nom + ' '+ publications[i].prenom
                                         publication.img_profil = publications[i].img_profil
                                     

                                                    let nbr = 0 ;
                                                for ( j = 0 ; j < likes.length ; j++){
                                                 
                                                          if( publications[i].id == likes[j].id_publication  ){
                                                            publication.nombreLike ++ ; 
                                                             
                                                          }

                                                }
                                              
                                                for ( x = 0 ; x < likes.length ; x++){
                                                 
                                                  if( row[0].id_user == likes[x].id_users && publications[i].id == likes[x].id_publication  ){
                                                                    // console.log(likes[x].id_users+'fdfdfdfdfddfdfdfdfdfdvfgdfgfdgd');
                                                   publication.ifLiked = 'true' ;
                                                   break ;
                                                  } else { publication.ifLiked = 'false' ; } 

                                        }





                                              
                                        ListfinalPublications.push(publication);

                                  }
                                  res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.writeHead(200, {'Content-Type': 'multipart/form-data'  })

        res.end(JSON.stringify(ListfinalPublications))

                    





                            }



                       });
                       




          
        }else {

          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
          res.setHeader('Access-Control-Allow-Credentials', true);
          res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'ERROR SERVER'  })
          res.end()


        }
        


        


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









//////////////  Add post new test whit file 






var uploads = multer({ dest: '../public/images/' })
  

  router.post('/upload/:titre/:text/:id',uploads.single('file'), function(req,res,next)
  {
      console.log("uploaded");
    //  res.json({result:1});
    // console.log(req.files.file.data+ 'res.files');
      console.log('//////////////////////////////////////////////////');
  //  console.log(typeof (req.files.file.data));

   // res.status(500).json(error);
   // var base = bufferToBase64(req.files.file.data) ;
  // console.log(req.files.file.data.toString('base64')) ;
    console.log(req.params.text);
      console.log(req.params.titre);
     console.log(JSON.stringify(req.files.file.headers))
    console.log(JSON.stringify(req.files.file.data.toString('base64').substr(0,20)))
var base = req.files.file.data.toString('base64').replace(/^data:(.*?);base64,/, ""); // <--- make it any type
var bases =base.replace(/ /g, '+'); // <--- this is important
  var time = Date.now().toString()+"out.mp4" ;
fs.writeFile('public/videos'+"/"+time,bases, 'base64', function(err) {
    console.log(err);
});
const queryUser = "INSERT INTO `publication_francais` \
  ( `content_text`, `content`, `content_type`, `date_pub`, `nbr_like`, `id_publisher`, `nbr_share`, `updated_date`, `deleted_at`, `titre`)\
   VALUES ( ?, ?, ?, NOW(), 0, ?, 0, NULL, NULL, ?);" 
    
    db.connexion.query(queryUser,[req.params.text,time,'video',req.params.id,req.params.titre],(err,rows,fields)=>{
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
      res.setHeader('Access-Control-Allow-Credentials', true);
    res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
       res.end('ok')
    })

       







  
  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/videos')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpeg')
    }
  })
   
  var upload = multer({ storage: storage });
  



  router.post('/uploads',upload.single('file'),function(req, res,next) {
              
          //   console.log(JSON.stringify(req.files.file));
               console.log('/////////////////////////////////');
              console.log(JSON.stringify(req.body));
              console.log('/////////////////////////////////');
             // console.log(JSON.stringify(req.params))
              console.log('/////////////////////////////////');
            //  console.log(req.files.image.data.toString('hex'));
            console.log(JSON.stringify(req.body));
         /*    let title ;

              if(!req.body.title){
                if(req.files.image){
                var base64Data = req.files.image.data.toString('base64').replace(/^data:image\/jpeg;base64,/, "");
                //console.log(base64Data);
                      var time = Date.now().toString()+"out.jpeg" ;
            
                     fs.writeFile('public/images'+"/"+time, base64Data, 'base64', function(err) {
                                  console.log(err +' §§§§§§§§§§§'  ); 
                                              }); 
              }}
          //  
                   if(req.body.title){
                        title = req.body.title ;
                   }  */

              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
              res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
              res.setHeader('Access-Control-Allow-Credentials', true);
              res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
            
              res.end('ok') 
            });




  router.post('/upl',function(req,res,next){
    
   /*  req.body.picture.map(file=>{
        console.log(file);
    })
    
*/    console.log(req.body.picture);
    let picture = req.body.picture.replace(/^data:image\/jpeg;base64,/, "") ;
   let contenu_text = req.body.contenu_text ;
   let contenu_titre = req.body.contenu_titre ;
   let contenu_type = req.body.content_type ;
   let token = req.body.token ;


   // console.log(picture);
    var time = Date.now().toString()+"outyyyyyyy.jpeg" ;


    fs.writeFile('public/images'+"/"+time, picture, 'base64', function(err) {
      if(err){
        console.log(err);
      } else 
      {
        const queryUserPerId = "select * from tokens where token = '"+token+"'"

db.connexion.query(queryUserPerId,(er,row,field)=>{
  if(er){
    console.log(er);
  } else if(!er){
  console.log('im heeeeeeeere')
  const queryUser = "INSERT INTO `publication_francais` \
  ( `content_text`, `content`, `content_type`, `date_pub`, `nbr_like`, `id_publisher`, `nbr_share`, `updated_date`, `deleted_at`, `titre`)\
   VALUES ( ?, ?, ?, NOW(), 0, ?, 0, NULL, NULL, ?);" 
 
  if(row[0].token==token)
  {   console.log('200')
    db.connexion.query(queryUser,[contenu_text,time,contenu_type,row[0].id_user,contenu_titre],(err,rows,fields)=>{
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
      res.end(JSON.stringify(rows))
    })
  }
  else
  {  console.log('no existing token')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.writeHead(400, {'Content-Type': 'multipart/form-data' , 'error': 'BAD TOKEN' })
    res.end() 
  }
}



 
})
      }
    
      }); 

  }) 


 router.post('/getfilepdf',upload.single('file'),function(req, res,next) {
              
           console.log(JSON.stringify(req.files.file));
               console.log('/////////////////////////////////');
              console.log(JSON.stringify(req.body));
              console.log('/////////////////////////////////');
             // console.log(JSON.stringify(req.params))
              console.log('/////////////////////////////////');
            //  console.log(req.files.image.data.toString('hex'));
            console.log(JSON.stringify(req.body));
         /*    let title ;
              if(!req.body.title){
                if(req.files.image){
                var base64Data = req.files.image.data.toString('base64').replace(/^data:image\/jpeg;base64,/, "");
                //console.log(base64Data);
                      var time = Date.now().toString()+"out.jpeg" ;
            
                     fs.writeFile('public/images'+"/"+time, base64Data, 'base64', function(err) {
                                  console.log(err +' §§§§§§§§§§§'  ); 
                                              }); 
              }}
          //  
                   if(req.body.title){
                        title = req.body.title ;
                   }  */

              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
              res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
              res.setHeader('Access-Control-Allow-Credentials', true);
              res.writeHead(200, {'Content-Type': 'multipart/form-data'  })
            
              res.end('ok') 
            });


  


module.exports = router;





