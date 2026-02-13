// services/Reviews/GetAllReviews.ts
export async function GetAllReviews() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/reviews', {
        method: 'GET',
        cache: 'no-store' // لضمان جلب أحدث المراجعات دائماً
    });

    if (!response.ok) {
        throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    return data.data; // بناءً على هيكلة الـ API المعتادة
}