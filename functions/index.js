
const admin = require('firebase-admin');
var {Storage} = require('@google-cloud/storage');
const functions = require('firebase-functions');
const env = functions.config();
const cors = require('cors')({origin: true});
const sgMail = require('@sendgrid/mail');
const image2base64 = require('image-to-base64');
sgMail.setApiKey(env.sendgrid_api.key);
admin.initializeApp(functions.config().firebase);
const storage = new Storage();
const playlistRef = storage.bucket('gs://our-wedding-55849.appspot.com/wedding_playlist');
const db = admin.firestore();
const guestList = db.collection('guests');
var uid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678900100';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
 
// ==========MENU==========
// I - ADMIN AUTH
// II - ADMIN OPERATIONS ( Updates, uploads, sms, etc... )
// III - GUEST MANAGEMENT
// IV - MUSIC PLAYLIST
// ==========*==========

// ==========ADMIN AUTH==========
exports.loginAdmin = functions.https.onRequest((req, res) => {
    cors( req, res, () => {
        if(req.body.entry === env.admin_pass.key) {
            res.send({code: 200});
        } else {
            res.send({code: 400});
        }
    });
});
// ==========end ADMIN AUTH==========

// ==========ADMIN OPS============
exports.sendSms = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log('lets go');
    });
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let email = req.body.content.email,
        firstName =  req.body.content.firstName,
        lastName =  req.body.content.lastName,
        body = {
            to: email,
            from: {name: 'Jacques Arnaud & Grace Lyne', email: 'ourwedding@now.com'},
            subject: `Invitation électronique pour ${lastName} ${firstName}`,
            content: {type: 'text/html', value: `<strong>Bonjour ${firstName}! Vous trouverez en pièce-jointe votre invitation electronique. Nous avons hâte de vous recevoir</strong>`},
            attachment: null
        };
        sgMail.send(body)
        .then( data => {
            res.send({
                code: 200,
                email: data
            });
        })
        .catch( error => {
            res.send({
                code: 500,
                error
            });
        })
    });
});
// ==========end ADMIN OPS==========

// ==========GUEST MANAGEMENT==========
exports.submitRSVP = functions.https.onRequest((req, res) => {
    cors( req, res, () => {
        let userInfo = req.body.userInfo,
        email = req.body.userInfo.email,
        firstName =  req.body.userInfo.firstName,
        lastName =  req.body.userInfo.lastName,
        code = userInfo.code,
        src = './banner.jpeg';
        // USE TO VERIFY DUBS
        // dupCheck = guestList.where('email', '==', email, '&&', 'firstName', '==', firstName);

        userInfo.uid = uid(16);
        if(code === env.invitation_code.key) {
            image2base64(src)
            .then(
                (response) => {
                    let body = {
                        to: email,
                        subject: `Invitation électronique pour ${lastName} ${firstName}`,
                        from: {name: 'Jacques Arnaud & Grace Lyne', email: 'ourwedding@now.com'},
                        content: [{type: 'text/html', value: `<strong>Bonjour ${firstName}! Vous trouverez en pièce-jointe votre invitation electronique. Nous avons hâte de vous recevoir</strong>`}],
                        attachments: [
                            {
                                content: response,
                                filename: `Invitation - ${firstName} ${lastName}.jpeg` + (req.body.plusOne ? ` ${req.body.plusOne}` : ''),
                                type: 'image/jpeg',
                                disposition: 'attachment',
                                contentId: 'eVite'
                            },
                        ]
                    };
                    sgMail.send(body)
                    .catch(e => {
                        console.log('sendgrid error: ', e);
                    });
            })
            .then( () => {
                guestList.doc(userInfo.uid).set(userInfo)
                .then(r => {
                    console.log('setting user in db', r);
                    res.send({
                        code: 200,
                        data: 'Opération réussie! Un email de confirmation sera envoyé à l\'adresse fournie!'
                    });
                })
                .catch(e => {
                    console.log('error setting userfinfo in db:', e);
                });
            })
            .catch(
                (error) => {
                console.log('base64', error);
            });
        } else {
            res.send({
                code: 400,
                error: 'Code secret invalide'
            });
        }
    });
});

exports.confirmGuest = functions.https.onRequest((req, res) => {
    cors( req, res, () => {
        let uid = req.body.uid;

        guestList.doc(uid).update({confirmed: true})
        .then( response => {
            res.send({
                code: 200,
                response
            });
        })
        .catch( error => {
            res.send({
                code: 500,
                error
            });
        });
    });
});

exports.removeGuest = functions.https.onRequest((req, res) => {
    cors( req, res, () => {
        let uid = req.body.uid,
        list =[];

        guestList.doc(uid).delete()
        .then( () => {
            guestList.get()
            .then( snapshot => {
                snapshot.forEach(doc => {
                    let guest = doc.data();
                    list.push({...guest, code:'*******************'});
                });
                res.send({
                    code: 200,
                    list
                });
            })
        })
        .catch( error => {
            console.log(error);
            res.send({
                code: 500
            });
        });
    });
});


exports.loadGuestList = functions.https.onRequest((req, res) => {
    cors( req, res, () => {
        let list = [];
        guestList.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let guest = doc.data();
                list.push({...guest, code:'*******************'});
                console.log(doc.data());
                console.log({list});
            });
        })
        .then(() => {
            res.send({
                code: 200,
                response: list
            });
        })
        .catch(error => {
            console.log(error);
            res.send({
                code: 500,
                error
            });
        });
    });
});

// ==========end GUEST MANAGEMENT==========

// ==========MUSIC PLAYLIST==========
exports.loadPlaylist = functions.https.onRequest((req, res) => {
    cors( req, res, () => {
        playlistRef.getFiles()
        .then(playlist => {
            res.send({
                playlist
            });
        })
        .catch(error => {
            res.send({
                error
            });
        });
    });
});
// ==========end PLAYLIST==========

