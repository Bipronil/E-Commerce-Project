import Container from "@/app/components/Container";
import { product } from "@/utils/product";
import ProductDetails from "./ProductDetails";

interface Iparams {
    productId?: string;

}


const Product = ({params} : {params : Iparams}) => {
    console.log("params", params);
   
    return ( <div>
        <Container>
            <ProductDetails product = {product}/>
        </Container>
    </div> );
}
 
export default Product;