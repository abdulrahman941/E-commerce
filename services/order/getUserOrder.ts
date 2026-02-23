"use server"
import { getAccessToken } from "../../schema/access-token";

export async function getUserOrder(userId: string) {
    const token = await getAccessToken();

    if (!token) {
        throw new Error('Unauthorized: No token found');
    }

    // التأكد من أن userId صالح
    if (!userId || userId === "undefined") {
        throw new Error('User ID is missing or invalid');
    }
   
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user orders');
    }

    return await response.json();
}