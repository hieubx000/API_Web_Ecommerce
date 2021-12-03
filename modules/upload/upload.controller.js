const { initializeApp } = require('firebase/app')
    // const { getAnalytics } = require("firebase/analytics");
const { getDownloadURL, getStorage, ref, uploadBytes } = require('firebase/storage');
const HttpError = require('../../common/httpError');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "650265915704",
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-TKVCJEX6MF"
};

const app = initializeApp(firebaseConfig)

const firebaseStorage = getStorage(app)

const buildFileName = (originalname) => {
    const ext = originalname.split('.').pop()

    const fileName = originalname.substring(0, originalname.indexOf(ext) - 1)

    return `${fileName} - ${Date.now()}.${ext}`
}

const whiteList = ['png', 'jpeg']

const preventUploadTypeFile = originalname => {
    const ext = originalname.split('.').pop()

    if (!whiteList.includes(ext)) {
        throw new HttpError('not support file type', 400)
    }
}

const uploadToCloud = async(req, res) => {
    const file = req.file;

    const { buffer, originalname, mimetype } = file;

    preventUploadTypeFile(originalname)

    const imageRef = ref(firebaseStorage, buildFileName(originalname))

    const data = await uploadBytes(imageRef, buffer, {
        contentType: mimetype
    })

    const downloadUrl = await getDownloadURL(data.ref)
    res.send({
        success: 1,
        data: downloadUrl
    })
}

module.exports = {
    uploadToCloud
}