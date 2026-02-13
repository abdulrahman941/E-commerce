"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteReviews } from "@/services/Reviews/deleteReviews"
import { UpdateReviews } from "@/services/Reviews/updateReviews"
import toast from "react-hot-toast"
import { useState } from "react";

export default function DropDownReview({ reviewId }: { reviewId: string }) {
    // 1. استخدام Disclosure للتحكم في المودال
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [review, setreview] = useState("");
    const [rating, setrating] = useState(0);

    const queryClient = useQueryClient();

    // 2. حذف التقييم
    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => deleteReviews(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-review'] });
            toast.success("The review is deleted");
        },
        onError: (error: any) => {
            toast.error(error.message);
        }
    });

    // 3. تحديث التقييم
    const { mutate: handleUpdateMutation, isPending: isLoading } = useMutation({
        mutationFn: (data: { review: string, rating: number }) =>
            UpdateReviews(reviewId, data),
        onSuccess: () => {
            toast.success('Review updated successfully');
            queryClient.invalidateQueries({ queryKey: ['get-review'] }); // تأكد من توحيد الـ Key
            onOpenChange(); // إغلاق المودال بعد النجاح
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update review');
        }
    });

    // 4. وظيفة التعامل مع الفورم (كانت تحتوي على خطأ استدعاء خارجي)
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!review.trim()) return toast.error("Please enter a review");
        if (rating < 1 || rating > 5) return toast.error("Rating must be between 1 and 5");

        handleUpdateMutation({
            review: review,
            rating: Number(rating)
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <p className="cursor-pointer font-bold text-xl">...</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        {/* عند الضغط هنا نفتح المودال فقط */}
                        <DropdownMenuItem className="cursor-pointer" onClick={onOpen}>
                            Edit Review
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem 
                            className="text-red-600 cursor-pointer" 
                            onClick={() => deleteMutate(reviewId)}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Review'}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* مودال التحديث باستخدام HeroUI */}
            <Modal className="bg-white" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Update Your Review</ModalHeader>
                            <form onSubmit={handleUpdate}>
                                <ModalBody>
                                    <div className="flex flex-col gap-4">
                                        <input 
                                            value={review} 
                                            onChange={(e) => setreview(String(e.target.value))} 
                                            className="w-full border p-2 rounded outline-none focus:border-indigo-500" 
                                            placeholder="Update your review text" 
                                            type="text" 
                                        />
                                        <input 
                                            value={rating} 
                                            onChange={(e) => setrating(Number(e.target.value))} 
                                            className="w-full border p-2 rounded outline-none focus:border-indigo-500" 
                                            placeholder="Rating (1-5)" 
                                            type="number"
                                            min="1"
                                            max="5"
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="bg-gray-600 hover:bg-gray-400 rounded-md"color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button 
                                        isLoading={isLoading} 
                                        type="submit" 
                                        className="text-white bg-green-600 hover:bg-green-400 rounded-md"
                                    >
                                        Update Now
                                    </Button>
                                </ModalFooter> 
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}