export class Card{
   
    vendorlist:Array<Vendorlist>
    
} 

export class Vendorlist{
    vendor_id:number;
    vendor_name:string;
    product_list:Array<Product_model>
    
} 

export class Product_model{
    productId: number;
    quantity: number;
    price: number;
    model: string;
    name: string;
    vendorId: number;
    image: string;
    imagePath: string; 
}

