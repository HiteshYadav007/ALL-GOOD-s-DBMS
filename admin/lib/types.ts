import { Decimal } from "@prisma/client/runtime/library";

export interface Billboard {
	billboardId: string;
	label:string;
	imageUrl: string;
	categoryId:string;
	updatedAt:Date;
	createdAt:Date;
}

export interface subCategory {
	subCategoryId:string,
	name:string,
	createdAt:Date;
	updatedAt:Date;
	categoryId:string,
	billboardId:string,
}

export interface Size {
	sizeId:string
	name: string
	value:string
    categoryId:string
	createdAt:Date
	updatedAt:Date
}

export interface Product {
	productId:string
	name:string
	price:number
	categoryId:string 
	subcategoryId:string 
	sizeId:string
	quantity:Number
	isFeatured:Number
	imageUrl:string

}