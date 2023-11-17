export interface Billboard {
	billboardId:string
	label:string
	imageUrl:string

};

export interface Category {
	subCategoryId:string,
	name:string,
	categoryId:string,
	billboardId:string,
	updatedAt:Date;
	createdAt:Date;

};

export interface Product {
	productId:string
	categoryId:string
	subCategoryId:string
	name:string
	price:string
	quantity:number
	isFeatured:number
	sizeId:string
	imageUrl:string
	subCategoryName:string
	sizeName:string
};
export interface Size {
	sizeId:string
	name:string
	value:string
};

