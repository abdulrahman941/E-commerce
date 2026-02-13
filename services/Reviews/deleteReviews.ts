"use server"

import { getAccessToken } from "../../schema/access-token"

export async function deleteReviews(reviewId: string) {
    const token = await getAccessToken();

    if (!token) throw new Error('Unauthorized');

    try {
        // الرابط الديناميكي باستخدام reviewId
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });

        // قراءة الاستجابة كنص أولاً لتجنب خطأ Unexpected end of JSON input
        const responseText = await response.text();
        
        // محاولة تحويل النص إلى JSON إذا لم يكن فارغاً
        const payload = responseText ? JSON.parse(responseText) : {};

        if (!response.ok) {
            // إلقاء خطأ يحتوي على الرسالة القادمة من السيرفر أو رسالة افتراضية
            throw new Error(payload.message || `Error deleting review: ${response.statusText}`);
        }

        return payload;

    } catch (error: any) {
        console.error("Delete Review Error:", error);
        throw new Error(error.message || "Internal Server Error");
    }
}