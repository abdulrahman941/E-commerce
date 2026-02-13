"use server"
import { getAccessToken } from "../../schema/access-token"

export async function CreateReviews(productId: string, { review, rating }: { review: string, rating: number }) {
    const token = await getAccessToken()
    
    if (!token) throw new Error('Unauthorized');

    // تصحيح الرابط ليصبح ديناميكياً باستخدام ${productId}
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`, {        
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        // إرسال القيم الفعلية التي كتبها المستخدم
        body: JSON.stringify({
            review: review, // الحقل صحيح كما في الديكومنتيشن
            rating: Number(rating) // التأكد من إرسال التقييم كرقم
        })
    })

    const payload = await response.json()
    
    if (!response.ok) {
        throw new Error(payload.message || 'Error adding review');
    }
    
    return payload
}