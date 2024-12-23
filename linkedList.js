function createLinkedList(){
    let head = null;
    let tail = null;

    /**
     * 
     * @param {Object} node The node to append to the linked list 
     */
    function append(node){
        if(tail){
            tail.nextNode = node;
            tail = node;
        } else {
            head = tail = node;
        }
    }

    /**
     * 
     * @param {Object} node The node to prepend to the linked list
     */
    function prepend(node){
        if(head){
            node.nextNode = head;
            head = node;
        } else {
            head = tail = node;
        }
    }

    /**
     * 
     * @param {Number} count The variable to increment when we traverse the linked list
     * @param {Object} node The head of the linked list object 
     * @returns 
     */
    function size(count = 0, node = head){
        if(node === null) return count;
        return size(count + 1, node.nextNode);
    }

    
    /**
     * 
     * @param {Number} index The index of the node we should find
     * @param {Number} count The number to increment when we are iterating throught linked list
     * @param {Object} node The head of the linked list
     * @returns {(Number|Null)} Returns the indexed node or null if it doesn't exist
     */
    function at (index, count = 0, node = head){
        if(!node) return null;
        if(count === index) return node;
        return at(index, count + 1, node.nextNode);
    }

    /**
     * 
     * @param {Object} node The head of the linkedlist
     * @param {Object} previousNode To keep a trace of the previous node when traversing
     * @returns Returns nothings, just remove the last node of the linked list
     */
    function pop(node = head, previousNode){
        if(node.nextNode ===  null){
            tail = previousNode;
            if(previousNode) {
                previousNode.nextNode = null;
            } else {
                head = tail = null;
            }
            return;
        } 

        previousNode = node;
        pop(node.nextNode, previousNode);
    }

    /**
     * 
     * @param {*} value The value of the node we should verify if it exists
     * @param {*} node The head of the linked list
     * @returns {Boolean} Returns true if the node was found or false if it wasn't
     */
    function contains(value, node = head){
        if(node === null) return false;
        if(node.value === value) return true;
        return contains(value, node.nextNode);
    }

    /**
     * 
     * @param {*} value The value of the node we should find and returns
     * @param {Object} node The head of the linked list
     * @param {*} index The index of the found node 
     * @returns {Number} Returns the index of the found node
     */
    function find(value, node = head, index = 0){
        if(node === null) return null;
        if(node.value === value) return index;
        return find(value, node.nextNode, index + 1);
    }

    /**
     * 
     * @param {Object} node The head of the linked lits
     * @param {String} string The returned values of the nodes in a string format
     * @returns {String} Returns the string value
     */
    function toString(node = head, string = ''){
        if(node === null) return `${string} -> null`;
        string += `${node.value} -> `;
        return toString(node.nextNode, string);
    }
    
}

function createNode(value){
    return {
        value,
        nextNode: null
    }
}