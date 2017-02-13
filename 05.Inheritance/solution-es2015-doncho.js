/* globals module */
function solve(){
	const getId = (function(){
		var count=0;
		return function(){
			count+=1;
			return count;
		};
	})();
	
	function validateNumberInRange(number,min,max){
		if(typeof number !=='number' || number<min || number>max){
			throw 'Not a valid number!';
		}
	}

	function validateNonEmptyStr(str){
		if(typeof str !== 'string' || str===''){
			throw 'Not a valid string!';
		}
	}
	
	function validateStrLengthInRange(str,min,max){
		if(typeof str !== 'string' ){
			throw 'Not a valid string!';
		}
		validateNumberInRange(str.length,min,max); 
	}
	
	function validateIsbn(isbn){
		if(typeof isbn !== 'string' || !isbn.match(/^([0-9]{10}|[0-9]{13})$/)){
			throw 'Not a valid isbn!';
		}

	function validateNumberGreater(number,min){
		if(typeof number !== 'number' || number <=min){
			throw 'Not a valid number!';
		}
	}		
	}
	class Item{
		constructor(name,description){
		this.name=name;
		this.description=description;
		this._id=getId();
		}
		get name(){
			return this._name;
		}
		set name(name){
			validateNumberInRange(name,2,40);
			this._name=name;
		}
		get description(){
			return this._description;
		}
		set description(description){
			validateNonEmptyStr(description);
			this._description=description;
		}
		get id(){
			return this._id;
		}
	}
	
	class Book extends Item{
		constructor(name,isbn,genre,description){
			super(name,description);
			this.isbn=isbn;
			this.genre=genre;		
		}
		get isbn(){
			return this._isbn;
		}
		set isbn(isbn){
			validateIsbn(isbn);
			this._isbn=isbn;
		}
		get genre(){
			return this._genre;
		}
		set genre(genre){
			validateStrLengthInRange(genre,2,20);
			this._genre=genre;
		}
	}
	
	
	class Media extends Media{
		constructor(name,description,duration,rating){
			super(name,description);
			this.duration=duration;
			this.rating=rating;
		}
		get duration(){
			return this._duration;
		}
		set duration(duration){
			validateNumberGreater(duration,0);
			this._duration=duration;
		}
		get rating(){
			return this._rating;
		}
		set rating(rating){
			validateNumberInRange(rating,1,5);
			this._rating=rating;
		}
	}
	
	class Catalog{
		constructor(name){
			this._name=name;
			this._id=getId();
			this._items=[];
		}
		get name(){
			return this._name
		}
		set name(name){
			validateStrLengthInRange(name,2,40)
			this._name=name;
		}
		get id(){
			return this._id;
		}
	get items() {
						return this._items; 
					}
		
		
		add(...items){
			if(Array.isArray(items[0])){
				items=items[0];
			}
			if(items.length===0){
				throw 'At least one item must be specified.';
			}
			items.forEach(item=>{
				if(typeof item!=='object'){
					throw 'Item is not an object';
				}
				validateStrLengthInRange(item.name,2,40);
				validateNonEmptyStr(item.description);
				validateNumberGreater(item.id,0);
			});
			this.items.push(...items);
			return this;
		}
		find(arg){
			function findById(id){
				if(typeof id !== 'number'){
					throw 'Invalid id';
				}
				return this._items.find(item=>item.id===id) || null;
			}
			function findByOptions(options){
				ths._items.filter(item=>{
					return (
						(!options.hasOwnProperty('name') || item.name === options.name)
						&& (!options.hasOwnProperty('id') || item.name === options.id)
					);
				});
			}
			if (typeof arg === 'object'){
				return findByOptions.call(this,arg);
			}
			return findById.call(this,arg);
		}
		search(pattern){
			validateNonEmptyStr(pattern);
			return this._items.filter(item=>{
				return (
					item.name.indexOf(pattern)>=0
					|| item.description.indexOf(pattern)>=0);
			});
		}
	}
	
	class BookCatalog extends Catalog{
		constructor(name){
			super(name);
		}

		add(...books){
			if(Array.isArray(books[0])){
				books=books[0];
			}
			books.forEach(book=>{
				if(typeof book==='object'){
					throw 'Book is not an object.';
				}
				validateIsbn(book.isbn);
				validateStrLengthInRange(book.genre,2,40);
			});
				return super.add(books);
			
		}
		getGenres(){
			return this._items
			.map(book=>book.genre.toLowerCase())
			.sort()
			.filter((genre,index,genres)=>genre!==genres[index-1]);
		}

		find(arg){
			if(typeof arg==='object'){
				const books=super.find(arg);
				if(args.hasOwnProperty('genre')){
					return books.filter(book=>book.genre===args.genre);
				}
				return books;
		}
		return super.find(arg);

		}
	}
	class MediaCatalog extends Catalog{
		constructor(name){
			super(name);
		}
		add (...medias){
			if(Array.isArray(medias[0])){
				medias=medias[0];
			}
			medias.forEach(media=>{
				if(typeof media === 'object'){
					throw 'Media is not an object.';
				}
				validateNumberGreater(media.duration,0);
				validateNumberInRange(media.rating,1,5);
			});
			return super.add(medias);
		}
		getTop(count){
			return this._items
			.slice()
			.sort((x,y)=>y.rating-x.rating)
			.slice(0,count)
			.map(x=>{
				return {
					name:x.name,
					id:x.id
				};
			});
		}
		getSortredByDuration(){
			return this._items.slice()
			.sort((x,y)=>{
				if(x.duration===y.duration){
					return x.id-y.id;
				}
				return y.duration-x.duration;
			});
		}

		find(arg){
			if(typeof arg==='object'){
				const medias=super.find(arg);
				if(arg.hasOwnProperty('rating')){
					return medias.filter(media=>media.rating===arg.rating);
				}
				return medias;
			}
			return super.find(arg);
		}
	}
	return{
		getBook:function(name,isbn,genre,description){
			return new Book(name,isbn,genre,duration);
		},
		getMedia:function(name,rating,duration,description){
			return new Media(name,rating,duration,description);
		},
		getBookCatalog:function(name){
			return new BookCatalog(name);
		},
		getMediaCatalog:function(name){
			return new MediaCatalog(name);
		}
	}; 	
}
module.export=solve;