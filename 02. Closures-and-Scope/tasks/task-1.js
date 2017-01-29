/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];
		function listBooks(arg) {
			if(arguments.length>0){
		  if(typeof parameter.category !== 'undefined') {
                    return typeof categories[parameter.category] !== 'undefined' ?
                        categories[parameter.category].books : [];
                }

				if(typeof arg.author!=='undefined'){
					var booksToList=[],
					len=books.length;
					for (var i = 0; i < len; i+=1) {
						if(books[i].author===arg.author){
							booksToList.push(books[i]);
						}
					}
					return booksToList;
				}
			}
			return books;
		}
		
		function parameterAlreadyExists(name,type){
			for (var i = 0; i < books.length; i+=1) {
			if(books[i][type]==name){
				return true;
			}
			}
			return false;
		}
		
		function bookAlreadyExists(param){
			throw new Error("A book with the same "+ param+" already exists!");
		}
							     
		function addCategory(name) {
            categories[name] = {
                books: [],
                id: categories.length + 1
            };
		}
		
		function checkBook(book,expectedParams){
			if(Object.keys(book).length!==expectedParams){
				throw new Error('Some of the parameters is missing!');
			}
			for(var param in book){
				if(typeof book[param]==='undefined'){
					throw new Error( param +' cannot be undefined');
				}
			}
		}
		
		function validateAuthor(author){
			if(author.trim()===''){
				throw new Error('Ivalid author!');
			}
		}
		
		function validateIsbn(isbn) {
            if(isbn.length !== 10 && isbn.length !== 13) {
                throw new Error('ISBN must be either 10 or 13 digits');
            }
			
				if(!/^[0-9]+$/.test(isbn.toString())) {
					throw new Error('ISBN must be a valid number');
				}
        }

		function validateTitle(title){
			if(title.length<2 || title.length>100){
				throw new Error( "Title must be between 2 or 100 symbols");
			}
		}

		function addBook(book) {
			book.ID = books.length + 1;
			
			checkBook(book,5);
			
			if(parameterAlreadyExists(book.title,'title')) {
				bookAlreadyExists('title');
			}
			
			if(parameterAlreadyExists(book.isbn,'isbn')){
				bookAlreadyExists('ISBN');
			}
			
			if(categories.indexOf(book.category)<0){
				addCategory(book.category);
			}
			
			validateAuthor(book.author);
			validateIsbn(book.isbn);
			validateTitle(book.title);
			validateTitle(book.category);
			
			categories[book.category].books.push(book);
			
			books.push(book);
			return book;
		}

		function listCategories() {
			var cat=[];
			Array.prototype.push.apply(cat,Object.keys(categories));
			return cat;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
