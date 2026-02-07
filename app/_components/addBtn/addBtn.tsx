"use client"
import { useState } from "react"; // استيراد useState لتتبع حالة الضغط
import { Button } from "@/components/ui/button";
import { addTocart } from "../../../services/cart/add-prod-cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddToWishList } from "@/services/wishlist/add-prod-WishList";
import { DeleteWishListItem } from "@/services/wishlist/delete-WishList-item";
import { Heart } from "lucide-react";

export default function AddBtn({ productId }: { productId: string }) {
    const queryClient = useQueryClient();
    
    // حالة محلية لمعرفة ما إذا كان المنتج قد تم إضافته بالفعل في هذه الجلسة
    const [isAdded, setIsAdded] = useState(false);

    // 1. جلب قائمة المفضلة (Query)
    const { data: WishListData } = useQuery({
        queryKey: ['get-WishList'],
        queryFn: async () => {
            const response = await fetch('/api/WishList');
            return await response.json();
        }
    });

    const isFav = WishListData?.data?.some((item: any) => item._id === productId);

    // 2. ميوتيشن الإضافة للسلة
    const { mutate: addProductToCart, isPending: isAddingToCart } = useMutation({
        mutationFn: addTocart,
        onSuccess: (data) => {
            toast.success(data?.message || "Added to cart");
            setIsAdded(true); // تغيير الحالة لتعطيل الزر نهائياً بعد النجاح
            queryClient.invalidateQueries({ queryKey: ['get-cart'] });
        },
        onError: () => toast.error('Login first')
    });

    // 3. ميوتيشن المفضلة (Toggle)
    const { mutate: handleToggleWishList, isPending: isWishListing } = useMutation({
        mutationFn: () => isFav ? DeleteWishListItem(productId) : AddToWishList(productId),
        onSuccess: () => {
            toast.success(isFav ? "Removed from wishlist" : "Added to wishlist");
            queryClient.invalidateQueries({ queryKey: ['get-WishList'] });
        },
        onError: () => toast.error('Something went wrong')
    });

    return (
        <div className="flex justify-center items-center gap-3 px-5">
            {/* زر الإضافة للسلة */}
            <Button 
                onClick={() => addProductToCart(productId)} 
                // الزر يتعطل في حالتين: أثناء الإضافة (isPending) أو إذا تم إضافته بالفعل (isAdded)
                disabled={isAddingToCart || isAdded}
                className={`w-[80%] mx-auto font-bold transition-all ${
                    isAdded 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`} 
                variant="outline"
            >
                {isAddingToCart ? "Adding..." : isAdded ? "Already in Cart" : "Add to cart"}
            </Button>

            {/* أيقونة القلب الذكية */}
            <span 
                className={`cursor-pointer transition-transform active:scale-90 ${isWishListing ? 'opacity-50 pointer-events-none' : ''}`} 
                onClick={() => !isWishListing && handleToggleWishList()}
            >
                <Heart 
                    size={28} 
                    fill={isFav ? "#ff0000" : "transparent"} 
                    stroke={isFav ? "#ff0000" : "currentColor"} 
                    className={`transition-colors duration-300 ${isFav ? 'text-red-600' : 'text-gray-500'}`}
                />
            </span>
        </div>
    );
}