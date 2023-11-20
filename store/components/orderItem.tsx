import React from 'react'
import Currency from "./ui/currency";
import Image from "next/image";



interface OrderItem{
		productId:string
		productName:string,
		imageUrl:string,
		price:string,
		createdAt:Date,
		sizeName:string,
		subCategoryName:string
}

interface OrderItemProps {
	data:OrderItem
}

const orderItem:React.FC<OrderItemProps> = ({
	data
}) => {
  return (
	<li className="flex py-6 border-b">
			<div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
				<Image 
					fill 
					src={data.imageUrl}
					alt="Image"
					className="object-cover object-center"
					/>
				</div>
				<div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6 ">
					<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 ">
						<div className="flex justify-between">
							<p className="text-lg font-semibold text-black ">
								{data.productName}
							</p>
						</div>
						<div className="mt-1 flex text-sm">
							<p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data.sizeName}</p>
						</div>
						<Currency value={data.price}/>
					</div>
					<p >{data.subCategoryName}</p>

			</div>
		</li>
  )
}

export default orderItem