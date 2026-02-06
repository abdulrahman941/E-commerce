import Image from "next/image";
import HomeSlider from "./_components/homeSlider/homeSlider";
import CategorySlider from "./_components/categorySlider/categorySlider";
import AllProducts from "./_components/allProducts/allProducts";



export default function home() {

  return <>
  
<HomeSlider/> 
<CategorySlider/> 
<AllProducts/>
  </>
   
}
