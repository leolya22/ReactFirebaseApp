import firebase from "../Config/firebase";

export async function fireRegister(data) {
    const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
    if(response.user.uid) {
        const document = await firebase.firestore().collection("usuarios").add({
            name: data.nombre,
            lastname: data.apellido,
            email_alt: data.email2,
            tel: data.telefono,
            id: response.user.uid
        });
        return document;
    };
}

export async function login(data) {
    const response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    return response;
}

export async function getInfo(id) {
    const document = await firebase.firestore().collection("usuarios").where('id', '==', id).get();
    return document.docs[0].data();
}

