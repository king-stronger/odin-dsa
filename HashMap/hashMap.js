import { createLinkedList, createNode } from "../LinkedList/linkedList";

function hashMap(){
    let capacity = 16;
    let loadFactor = 0.8;
    let numberOfStoredItems = 0;
    let buckets = new Array(capacity);

    /**
     * 
     * @param {string} key 
     * @param {*} value 
     */
    function set(key, value){
        let index = hash(key);

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if(!buckets[index]){
            buckets[index] = createLinkedList();
        }

        let list = buckets[index];
        let existingNodeIndex = list.find(value);

        if(existingNodeIndex){
            let existingNode = list.at(existingNodeIndex);
            existingNode.value = value;
        } else {
            list.append(createNode({key, value}));
            numberOfStoredItems++;

            if(capacity * loadFactor <= numberOfStoredItems){
                rehash();
            }
        }
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
            hashcode = hashcode % capacity;
        }
    
        return hashcode;
    }

    return {
        set
    }
}
