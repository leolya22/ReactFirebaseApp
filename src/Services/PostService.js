import firebase from "../Config/firebase";


export default async function getProducts() {
    return await firebase.firestore().collection("products").get();
}

export async function getProductById(id) {
    return await firebase.firestore().doc(`products/${id}`).get();
}

export async function createProduct(data) {
    const response = await firebase.firestore().collection("products").add({
        name: data.name,
        desc: data.description,
        link: data.link
    });
    return response;
}

export async function modifyProduct(data, id) {
    const response = await firebase.firestore().collection("products").doc(id).set({
        name: data.name,
        desc: data.description,
        link: data.link
    });
    return response;
}

export async function deleteProduct(id) {
    const response = await firebase.firestore().collection("products").doc(id).delete();
    return response;
}
