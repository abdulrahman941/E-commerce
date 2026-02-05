export type category = {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
};

// هذا هو "Array of Objects" الذي تحتاجه
export type categoryArray = category[];