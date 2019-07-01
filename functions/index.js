const admin = require('firebase-admin');
const functions = require('firebase-functions');
const env = functions.config();
const cors = require('cors')({origin: true});
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(env.sendgrid_api.key);

admin.initializeApp(functions.config().firebase);

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
        let email = req.body.email;
        sgMail.send(email)
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
        let userInfo = req.body.userInfo;
        userInfo.uid = uid(16);
        userInfo.confirmed = false;
        if(userInfo.code === env.invitation_code.key) {
            guestList.doc(userInfo.uid).set(userInfo)
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
        let userInfo = req.body.userInfo;

        guestList.doc(userInfo.uid).delete()
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


exports.loadGuestList = functions.https.onRequest((req, res) => {
    cors( req, res, () => {
        let response = [];
        guestList.get()
        .then(snapshot => {
            snapshot.forEach(document => {
                response.push(document.data());
            });
            res.send({
                code: 200,
                response: response
            });
        })
        .catch(error => {
            res.send({
                code: 500,
                error
            });
        });
    });
});

// ==========end GUEST MANAGEMENT==========
