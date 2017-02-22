function solve() {
	function getProduct(productType, name, price) {
	return {
		productType:productType,
		name:name,
		price:price
	};
	
	}

	function getShoppingCart() {
	const products=[];
	function add(product){
		this.products.push(product);
		return this;
	}
	function remove(product){
		const index=products.findIndex(p=>p.name===product.name 
		&& p.productType===product.productType && p.price===product.price);
		if(index<0){
			throw 'product not found.';
		}
		products.splice(index,1);
		return this;
	}
	function showCost(){
		let cost=0;
		for(const product of products){
			cost=cost+product.price;
		}
		return cost;
		//return products.reduce((cost,product)=>cost+product.price,0);
	}
	function showProductTypes(){
		//var uniqTypes=[];
	//	for(var p of products){
	//		if(uniqTypes.indexOf(p.productType)<0){
		//		uniqTypes.push(p.productType);
			//}
			return products.map(p=>p.productType)
			.sort().filter((p,ind,ps)=>p!==ps[ind-1]);
		}
//	return uniqTypes.sort();
//	}
	function  getInfo(){
		const uniqNames=products.map(p=>p.name)
		.sort()
		.filter((p,i,ps)=>p!==ps[i-1])
		.map(name => {
			const withThisName=products.filter(p=>p.name===name);
			return{
				name:name,
				quantity:withThisName.length,
				totalPrice:withThisName.reduce((cost,product)=>cost+product.price,0)
			}
		});
		return {
			products:uniqNames,
			totalPrice:showCost()
		}
	}
	return {
 	   products: products,
    	add: add,
    	remove: remove,
   	    showCost: showCost,
   	    showProductTypes: showProductTypes,
    	getInfo: getInfo

		}
	}
	return {
		getProduct: getProduct,
		getShoppingCart: getShoppingCart
	};
}

module.exports = solve();
