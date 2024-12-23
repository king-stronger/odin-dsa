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

    
}

function createNode(value){
    return {
        value,
        nextNode: null
    }
}