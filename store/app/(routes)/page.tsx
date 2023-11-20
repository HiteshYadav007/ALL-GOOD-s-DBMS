import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard"
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const revalidate = 0;

const HomePage = async() => {

  const session = await getServerSession(authOptions);
	
	if(!session?.user){
		redirect('/sign-in');
	}
  const products = await getProducts({isFeatured:1});
  const billboard = await getBillboard('8e815f3a-ef4f-4e11-93f8-9852c5d97158');

  return (
  
    <Container>
      <div className="space-y-10 pb-10">
          <Billboard data={billboard}/>
          <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products}/>
          </div>
      </div>
    </Container>
  )
}

export default HomePage