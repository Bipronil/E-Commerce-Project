import Container from "@/app/components/Container";
import { product } from "@/utils/product";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";

interface Iparams {
    productId?: string;

}


const Product = ({params} : {params : Iparams}) => {
    console.log("params", params);
   
    return ( <div>
        <Container>
            <ProductDetails product = {product}/>
            <div className="flex flex-col mt-20 gap-4">
                <div>
                    add rating
                </div>
                <div>
                 <ListRating product={product}/>
                </div>
            </div>
        </Container>
    </div> 
    );
}
 
export default Product;