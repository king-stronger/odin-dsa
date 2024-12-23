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
}

function createNode(value){
    return {
        value,
        nextNode: null
    }
}