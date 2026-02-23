import { getUserOrder } from "@/services/order/getUserOrder";
import Image from "next/image";

// تعريف المنتج داخل الطلب
interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  category?: { name: string };
  brand?: { name: string };
}

// تعريف العنصر الواحد في السلة داخل الطلب
interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

// تعريف عنوان الشحن
interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

// تعريف الطلب بالكامل
interface Order {
  _id: string;
  createdAt: string;
  isPaid: boolean;
  paymentMethodType: string;
  totalOrderPrice: number;
  cartItems: CartItem[];
  shippingAddress?: ShippingAddress;
}
// ... (ضع الـ Interfaces هنا)

interface PageProps {
  params: Promise<{ userId: string }>;
}

function formatDate(dateString: string) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; 
}

export default async function OrdersPage({ params }: PageProps) {
  const { userId } = await params;

  try {
    // إخبار TypeScript أن النتيجة هي مصفوفة من الطلبات
    const orders: Order[] = await getUserOrder(userId);

    if (!orders || orders.length === 0) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
          <div>
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg">No previous orders found.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 overflow-x-hidden">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-10 text-green-600 flex items-center gap-2">
          My Orders History
        </h1>

        <div className="space-y-12">
          {orders.map((order: Order) => ( // تم استبدال any بـ Order
            <div
              key={order._id}
              className="group border border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden transition-all hover:shadow-md"
            >
              {/* --- Header --- */}
              <div className="bg-gray-50/80 p-5 md:p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Order Identifier</span>
                  <p className="font-mono text-sm text-gray-700 break-all leading-tight">#{order._id}</p>
                </div>
                
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight ${
                    order.isPaid ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {order.isPaid ? "● Paid" : "● Pending Payment"}
                  </span>
                </div>
              </div>

              {/* --- Grid Summary --- */}
              <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Payment Strategy</p>
                  <p className="text-sm font-semibold text-gray-800 capitalize">{order.paymentMethodType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Creation Date</p>
                  <p className="text-sm font-semibold text-gray-800">{formatDate(order.createdAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Total Investment</p>
                  <p className="text-xl font-black text-green-600 flex items-baseline gap-1">
                    {order.totalOrderPrice?.toLocaleString()} 
                    <span className="text-[10px] font-normal text-gray-500 italic">EGP</span>
                  </p>
                </div>
              </div>

              {/* --- Items List --- */}
              <div className="px-5 md:px-6 pb-6">
                <h3 className="text-xs font-bold text-gray-800 mb-5 flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-green-500"></span>
                  Package Summary ({order.cartItems?.length} items)
                </h3>
                
                <div className="space-y-4">
                  {order.cartItems?.map((item: CartItem) => ( // تم استبدال any بـ CartItem
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-gray-50 hover:border-green-100 hover:bg-green-50/30 transition-colors"
                    >
                      <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white rounded-lg border border-gray-100 p-1">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          sizes="(max-width: 768px) 80px, 100px"
                          className="object-contain rounded-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0 w-full">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 line-clamp-1 mb-1">
                          {item.product.title}
                        </h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
                          <p><span className="font-semibold">Brand:</span> {item.product.brand?.name || "N/A"}</p>
                          <p><span className="font-semibold">Quantity:</span> {item.count}</p>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <p className="text-sm font-bold text-gray-900">
                             {item.price} <span className="text-[10px] text-gray-400 font-normal">EGP/unit</span>
                          </p>
                          <p className="text-xs font-black text-green-700">
                            Subtotal: {(item.count * item.price).toLocaleString()} EGP
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- Address --- */}
              {order.shippingAddress && (
                <div className="bg-blue-50/40 p-5 md:p-6 border-t border-blue-50">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📍</span>
                    <div className="text-xs md:text-sm text-gray-600 space-y-1">
                      <p className="font-bold text-blue-900 uppercase text-[10px] tracking-widest">Shipping Destination</p>
                      <p className="font-medium text-gray-700">{order.shippingAddress.details}, {order.shippingAddress.city}</p>
                      <p className="text-gray-500">Contact: {order.shippingAddress.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error: unknown) { // استخدام unknown بدلاً من any للمعالجة الآمنة
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-red-50 rounded-3xl border border-red-100">
        <p className="text-red-600 font-bold mb-4">Something went wrong while fetching orders.</p>
        <code className="text-[10px] bg-red-100 p-2 rounded block mb-6">{message}</code>
        <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-8 py-2 rounded-full text-sm font-bold hover:bg-red-700">
          Try Again
        </button>
      </div>
    );
  }
}