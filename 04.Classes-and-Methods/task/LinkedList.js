class ListNode{
     constructor(value) {
        this._value = value;
        this._next = null;
        this._previous = null;
    }
 
    get value() {
        return this._value;
    }
 
    set value(newValue) {
        this._value = newValue;
    }
 
    get next() {
        return this._next;
    }
 
    set next(nextNode) {
        this._next = nextNode;
    }
 
    get previous() {
        return this._previous;
    }
 
    set previous(prevNode) {
        this._previous = prevNode;
    }
}

class LinkedList{
    constructor(){
        this._first=null;
        this._last=null;
        this._length=0;
    }
    get first(){
        return this._first.value;
    }
  

     get last(){
        return this._last.value;
    }
  

     get length(){
        return this._length.value;
    }
 
    
    appendValue(value){
        var node=new ListNode(value);
        if(this._first === null && this._last === null){
            this._first=node;
            this._last=node;
    } else{
        this._last.next=node;
        node.previous=this._last;
        this._last=node;
    }
    this._length+=1; 
    }
    
    append(...items){
        for(var item in items){
            this.appendValue(item);
        }
        return this;
    }

     prependValue(value){
        var node=new ListNode(value);
        if(this._first === null && this._last === null){
            this._first=node;
            this._last=node;
    } else{
        this._first.previous=node;
        node.next=this._first;
        this._first=node;
    }
    this._length+=1; 
    }
    prepend(...items){
        for (var i = items.length-1; i >=0; i-=1) {
            this.prependValue(items[i]);
        }
        return this;
    }

    insert(index, ...items){
        if(index<0 || index>=this._length){
            throw new Error(" The Index is outside the boundaries of the list");
        }
        var values=this.toArray;
        values.splice(index,0 ,...items);
        this._first=null;
        this._last=null;
        this._length=0;
        this.append(...values);
        return this;
    }

    removeAt(index){
        var values=this.toArray();
        var removeValue=values.splice(index,1);
        this._first=null;
        this._last=null;
        this._length=0;
        this.append(...values);
        return removeValue;
    }

    at(index,value){
         var values=this.toArray();
         if(value===undefined){
             return values[index];
         } else{
             var currIndex=0;
             var currNode=this._first;
           while (currentIndex < this._length && currentNode !== null){
                 if(currIndex===index){
                    currNode.value=value;
                    break;
                 }
                 currNode=currNode.next;
                 currIndex+=1;
             }
         }
    }
    toArray(){
        var res=[];
        var node=this._first;
        while  (node != null){
            res.push(node.value);
            node=node.next;
        }
        return res;
    }
}
LinkedList.prototype[Symbol.iterator] = function*() {
    let node = this._first;
 
    while (node !== null) {
        yield node.value;
        node = node.next;
    }
};

 module.exports = LinkedList;