import Image from "next/image";
import HomeSlider from "./_components/HomeSlider/HomeSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import AllProducts from "./_components/AllProducts/AllProducts";


export default function home() {

  return <>
  
<HomeSlider/> 
<CategorySlider/> 
<AllProducts/>
  </>
   
}
