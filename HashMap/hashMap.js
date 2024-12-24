import { createLinkedList, createNode } from "../LinkedList/linkedList.js";

export function hashMap(){
    let capacity = 16;
    let loadFactor = 0.8;
    let numberOfStoredItems = 0;
    let buckets = new Array(capacity);

    /**
     * The find method is still not goot because the linkedlist wasn't adapted for it
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
        let existingNodeIndex = list.find({key, value});
        
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
     * @param {string} key 
     * @returns {*|null} Returns the value if it was found or null if it wasn't
     */
    function get(key){
        let index = hash(key);
        let list = buckets[index];
        
        if(!list){
            return null;
        }
        
        let node = list.getHead();
        
        while(node){
            if(node.value.key === key){
                return node.value.value;
            }
            node = node.nextNode;
        }

        return null;
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean} Returns a true or false statement if it found the key or not
     */
    function has(key){
        let index = hash(key);
        let list = buckets[index];

        if(!list){
            return false;
        }

        let node = list.getHead();

        while(node){
            if(node.value.key === key){
                return true;
            }
            node = node.nextNode;
        }

        return false;
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean} Returns a true or false statement if the item has been deleted or not
     */
    function remove(key){
        let index = hash(key);
        let list = buckets[index];

        if(!list){
            return false;
        }

        let node = list.getHead();
        let indexToRemove = 0;

        while(node){
            if(node.value.key === key){
                list.removeAt(indexToRemove);
                numberOfStoredItems--;
                return true;
            }

            indexToRemove++;
            node = node.nextNode;
        }

        return false;
    }

    /**
     * 
     * @returns {Number} Returns the number of stored items
     */
    function length(){
        return numberOfStoredItems;
    }

    /**
     * @returns {void} Returns nothing, just clear the hashmap
     */
    function clear(){
        capacity = 16;
        buckets = new Array(capacity);
        numberOfStoredItems = 0;
    }

    /**
     * 
     * @returns {Array} Returns an array containing all the keys inside the hashMap
     */
    function keys(){
        let keys = [];
        buckets.forEach(list => {
            let node = list.getHead();

            while(node){
                keys.push(node.value.key);
                node = node.nextNode;
            }
        });

        return keys;
    }

    /**
     * @returns {Array} Returns an array containing all the values of the hashmap
     */
    function values(){
        let values = [];
        buckets.forEach(list => {
            let node = list.getHead();

            while(node){
                values.push(node.value.value);
                node = node.nextNode;
            }
        });
        
        return values;
    }

    /**
     * 
     * @returns {Array} Returns an array that contains each key, value pair
     */
    function entries(){
        let entries = [];

        buckets.forEach(list => {
            let node = list.getHead();

            while(node){
                entries.push([node.value.key, node.value.value]);
                node = node.nextNode;
            }
        })

        return entries;
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

    /**
     * @returns {void} Returns nothing, just resize the buckets and rehash the keys
     */
    function rehash(){
        let oldBuckets = [...buckets];
        capacity *= 2;
        buckets = new Array(capacity);

        oldBuckets.forEach(list => {
            if(list){
                let node = list.getHead();

                while(node){
                    set(node.value.key, node.value.value);
                    node = node.nextNode;
                }
            }
        });
    }

    return {
        set, get, has, remove, length, clear, keys, values, entries
    }
}