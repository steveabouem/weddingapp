
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const env = functions.config();
const cors = require('cors')({origin: true});
const sgMail = require('@sendgrid/mail');
const image2base64 = require('image-to-base64');
sgMail.setApiKey(env.sendgrid_api.key);
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const guestList = db.collection('guests');
const blogPosts = db.collection('posts');
const comments = db.collection('comments');
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
// II - ADMIN OPERATIONS
//      II -1) - BLOG
//      II -2) - MEDIA
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

// ==========ADMIN OPERATIONS============

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

// ====BLOG=====
exports.createBlogPost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const entry = req.body.entry;
        let postId = uid(5);

        blogPosts.doc(postId).set({content: entry.content, title: entry.title, created: entry.created, id: postId})
        .then(() => {
            blogPosts.get()
            .then( snapshot => {
                let list = [];
                snapshot.forEach(doc => {
                    let post = doc.data();
                    list.push(post);
                });
                res.send({
                    code: '200',
                    blogPosts: list,
                });
            })
            .catch(e => {
                res.send({
                    code: 500,
                    error: e
                });
            });
        }).catch(e => {
            console.log('Error posting blog article', e);
            res.send({
                code: '500',
            });
        })
    });
});

exports.editPost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {id, update} = req.body;
        if(update.target === 'likes'){
            blogPosts.doc(id).update({[`likes.${uid(4)}`]: update.content})
            .then(res => {
                blogPosts.doc(id).get()
                .then(snapshot => {
                    res.send({
                        code: 200,
                        likes: snapshot.likes
                    });
                })
            })
            .catch(e => {
                console.log('ERROR', e);
                res.send({
                    code: 500
                });
            });   
        } else {
            blogPosts.doc(id).update(update)
            .then(() => {
                res.send({
                    code: 200
                });
            })
            .catch(e => {
                console.log('ERROR', e);
                res.send({
                    code: 500
                });
            });
        }
    });
});

exports.loadBlogPosts = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        blogPosts.get()
        .then( snapshot => {
            let list = [];
            snapshot.forEach(doc => {
                let post = doc.data();
                list.push(post);
            });
            res.send({
                code: 200,
                blogPosts: list
            });
        }).catch(e => {
            console.log('Error loading blog articles', e);
            res.send({
                code: '500',
            });
        })
    });
});

exports.deleteBlogPost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {id} = req.body;

        blogPosts.doc(id).delete()
        .then(() => {
            blogPosts.get()
            .then( snapshot => {
                let list = [];
                snapshot.forEach(doc => {
                    let post = doc.data();
                    list.push(post);
                });
                res.send({
                    code: 200,
                    blogPosts: list
                });
            });
        })
        .catch(e => {
            res.send({
                code: 500,
                error: 'Une erreur s\'est produite'
            });
        });
    });
});

exports.createPostComment = functions.https.onRequest((req, res) => {
    cors( req, res, () => {
        const {postId, comment} = req.body;
        let id = uid(6);

        comments.doc(postId).set({[`${postId}.${id}`]: comment})
        .then(() => {
            let commentsList = [];
            comments.get()
            .then( snapshot => {
                snapshot.forEach(doc => {
                    commentsList.push(doc.data());
                });
                res.send({
                    code: 200,
                    comments:commentsList
                });
            })
            .catch(e => {
                res.send({
                    code: 500,
                    error: e
                });
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

exports.loadPostComments = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        comments.get()
        .then(snapshot => {
            let commentsList =[];
            snapshot.forEach(doc => {
                commentsList.push(doc.data());
            });
            res.send({
                code: 200,
                comments:commentsList
            });
        })
        .catch(e => {
            console.log('Error loading comments', e);
            res.send({
                code: 500
            });
        });
    });
});
// ====end BLOG=====
    
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
        if((code === env.invitation_code.key || code === 'admin')) {
            image2base64(src)
            .then(
                (response) => {
                    let body = {
                        to: email,
                        cc: (userInfo.referer ? {email: userInfo.referer.email} ? userInfo.plus_one : {email: userInfo.plus_one.email} : null),
                        subject: `Invitation électronique pour ${lastName} ${firstName}`,
                        from: {name: 'Jacques Arnaud & Grace Lyne', email: 'ourwedding@now.com'},
                        content: [{type: 'text/html', value: `<strong>Bonjour ${firstName}! Vous trouverez en pièce-jointe votre invitation electronique. Nous avons hâte de vous recevoir</strong>`}],
                        attachments: [
                            {
                                content: response,
                                filename: `Invitation - ${firstName} ${lastName}.jpeg` + (req.body.plus_one ? ` ${req.body.plus_one}` : ''),
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
                    try {

                        if(userInfo.referer) {
                            // in case admins added the plus one themselves, from an existing user
                            guestList.doc(userInfo.referer.uid).update({plus_one: userInfo.uid});
                            guestList.doc(userInfo.uid).update({referer_uid: userInfo.referer.uid});
                        }  
                        
                        if(userInfo.plus_one) {
                            // in case guest added their own plus one themselves, as they're registering
                            let plusOneId = uid(16);
                            let data = {...userInfo.plus_one, referer: userInfo, uid: plusOneId};
                            guestList.doc(plusOneId).set(data);
                        }
                    } catch(e) {
                        console.log('error adding guests', e);
                        
                    }
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
                error: 'Code secret invalide, ou utilisateur non autorisé'
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

exports.editGuest = functions.https.onRequest((req,res) => {
    cors(req, res, () => {
        let uid = req.body.uid,
        updates = req.body.updates,
        user = guestList.doc(uid);

        user.set({
            updates
        })
        .then( r => {
            res.send({
                code: 200,
                update: r
            });
        })
        .catch( e => {
            console.log(e);
            res.send({
                code: 500
            });
        })
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