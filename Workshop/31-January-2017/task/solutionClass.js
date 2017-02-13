function solve() {

		class Product{
			constructor(productType,name,price){
				this._name=name,
				this._productType=productType,
				this._price=price
			}
			get name(){
				return this._name;
			}
			get productType(){
				return this._productType;
			}
			get price(){
				return this._price;
			}
		}
	class ShoppingCart {
		constructor(){
			this._products=[];
		}
		get products(){
			return this._products;
		}
		add(product){
		this.products.push(new Product(product.productType,product.name,product.price));
		return this;
	}
	 remove(product){
		const index=this.products.findIndex(p=>p.name===product.name 
		&& p.productType===product.productType && p.price===product.price);
		if(index<0){
			throw 'product not found.';
		}
		this.products.splice(index,1);
		return this;
	}
	 showCost(){
		//let cost=0;
		//for(const product of products){
		//	cost=cost+this.product.price;
		//}
		//return this.cost;
		return this.products.reduce((cost,product)=>cost+product.price,0);
	}
	showProductTypes(){
		//var uniqTypes=[];
	//	for(var p of products){
	//		if(uniqTypes.indexOf(p.productType)<0){
		//		uniqTypes.push(p.productType);
			//}
			return this.products.map(p=>p.productType)
			.sort().filter((p,ind,ps)=>p!==ps[ind-1]);
		}
//	return uniqTypes.sort();
//	}
	 getInfo(){
		const uniqNames=this.products.map(p=>p.name)
		.sort()
		.filter((p,i,ps)=>p!==ps[i-1])
		.map(name => {
			const withThisName=this.products.filter(p=>p.name===name);
			return{
				name:name,
				quantity:withThisName.length,
				totalPrice:withThisName.reduce((cost,product)=>cost+product.price,0)
			};
		});
		return {
			products:uniqNames,
			totalPrice:this.showCost()
		}
	}
	
	}
	return {
		Product: Product,
		ShoppingCart: ShoppingCart
	}
}
