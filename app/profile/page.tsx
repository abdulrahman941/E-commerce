import { getAccessToken } from "@/schema/access-token";
import Link from "next/link";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface UserJwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number; // تاريخ الإصدار (Timestamp)
  exp: number; // تاريخ الانتهاء (Timestamp)
  // أضف أي حقول أخرى تعود من الـ API الخاص بك
}
export default async function ProfilePage() {
    const token = await getAccessToken();

    if (!token) {
        redirect("/auth/login");
    }

    // فك التوكن
    const userData = jwtDecode<UserJwtPayload>(token);
    
    // ملاحظة: الـ API الخاص بـ Route يضع المعرف في userData.id
    const userId = userData.id; 

    return (
        <div className="container mx-auto p-10 max-w-lg">
            <div className="bg-white shadow-lg rounded-2xl p-8 border text-center">
                <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                    {userData.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className="text-gray-500 mb-6">{userData.email}</p>

                <div className="space-y-4">
                    {/* التأكد من تمرير userId هنا */}
                    <Link 
                        href={`/orders/${userId}`} 
                        className="block w-full bg-green-600 text-white py-3 rounded-xl font-bold"
                    >
                      view orders
                    </Link>
                </div>
            </div>
        </div>
    );
}