import LinkedList from "../LinkedList/LinkedList";

function hashMap(){
    let loadFactor = 0.8;
    let capacity = 16;
    let buckets = new Array(16);

    
}


/**
 * 
 * @param {String} key The key to hash
 * @returns {Number} Returns the hashcode
 */
function hash(key){
    let hashcode = 0;
    const primeNumber = 31;

    for(let i = 0; i < key.length; i++){
        hashcode = primeNumber * hashcode + key.charCodeAt(i);
        hashcode = hashcode % 16;
    }

    return hashcode;
}