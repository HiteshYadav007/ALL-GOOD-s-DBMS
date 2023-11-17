import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard"
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container"

export const revalidate = 0;

const HomePage = async() => {

  const products = await getProducts({isFeatured:1});
  const billboard = await getBillboard('4e4d8c63-1dcf-45bb-a38b-c7af41cb4392');

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