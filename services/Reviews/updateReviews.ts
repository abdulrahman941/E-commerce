"use server"

import { getAccessToken } from "../../schema/access-token"

export async function UpdateReviews(reviewId: string, { review, rating }: { review: string, rating: number }) {
    const token = await getAccessToken();

    if (!token) throw new Error('Unauthorized');

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: review, // تأكد أن الحقل المطلوب للسيرفر هو comment وليس review
                rating: rating
            })
        });

        const responseText = await response.text();
        const payload = responseText ? JSON.parse(responseText) : {};

        if (!response.ok) {
            throw new Error(payload.message || 'Error updating review');
        }

        return payload;

    } catch (error: any) {
        console.error("Update Error:", error);
        throw new Error(error.message || "Internal Server Error");
    }
}