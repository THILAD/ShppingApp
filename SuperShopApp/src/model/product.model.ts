import { Data } from "@angular/router";

//Images //
export class Images_model{
    protectId: number;
    image: string;
    containerName: string;
    defaultImage: number;
}
//end Images//

// //Add Product API//
// export class AddProduct_data{
//     status: number;
//     message: string;
//     data: AddProduct_model
// }

// export class AddProduct_model{
//     productName: string;
//     productDescription: string;
//     sku: string;
//     upc: string;
//     // image: string;
//     metaTagTitle: string;
//     categoryId: string;
//     relatedProductId: string;
//     model: number;
//     location: string;
//     price: string;
//     outOfStockStatus: number;
//     requiredShipping: number;
//     deteAvailable: string;
//     condition: number;
//     status: number;
//     sortorder: number;
//     image: Array<Images_model>
// }

//Product List API//
export class product_data{
    status: number;
    message: string;
    data:product_model[]
}

export class product_model{
    productId: number;
    price: string;
    sku: string;
    upc: string;
    quantity: number;
    stockStatusId: number;
    manufacturerId: number;
    dateAvailable: string;
    sortOrder: number;
    name: string;
    description: string;
    amount: number;
    condition: number;
    metaTagTitle: string;
    metaTagDescription: string;
    metaTagKeyword: string;
    is_active: number;
    Images:Array<Images_model>
}
 

export class product_list{
    limit:number;
    offset:number;
    keyword:string;
    sortOrder:number;
    count:number;

    constructor(){
        this.limit=0;
        this.offset=0;
        this.keyword='';
        this.sortOrder=0;
        this.count=0;
    }
}

//Category List API//
export class category_data{
   
    status: number;
    message: string;
    data:Array<category_model>

}

export class category_model {

    categoryId: number;
    name: string;
    image: string;
    imagePath: string;
    parentInt: number;
    sortOrder: number;
    metaTagTitle: string;
    metaTagDescription: string;
    metaTagKeyword: string;
    isActiv: number;
    levels:Array<levels_model>;
}
    export class levels_model{
        pathId: number;
        level: number;
        categoryName: string;
    }

export class Category_list{
    limit: number;
    offset: number;
    keyword: string;
    sortOder: number;
    count: number; 

    constructor(){
        this.limit=0;
        this.offset=0;
        this.keyword='';
        this.sortOder=0;
        this.count=0;
    }
}
//end Category List API//

//ads list//
export class ads_data{
    message : string;
    status : number;
    data: ads_model
}

export class ads_model{
    adsName: string;
    allowedPromote: number;
    endPro: Data;
    isActive : number;
    photo : Array<adsPhoto>;
    proCode : string;
    proName : string;
    statPro : Date;
    id : number;
}

export class adsPhoto{
    image: string;
    path : string;
}

export class ads_list{
    limit: number;
    offset: number;
    adsname: string;
}


export class product_adsName{
    createDate: string;
    productId: number;
    sku: string;
    upc: string;
    vendor: number;
    location: string;
    quantity: number;
    minimumQuantity: number;
    subtractStock:number;
    stockStatusId:number;
    image:string;
    imagePath:string;
    munufacturerId: number;
    shupping: number;
    price: string;
    dateAvailable: string;
    sortOrder: number;
    name: string;
    description: string;
    amount: number;
    metatagtitle: string;
    metatagdescription: string;
    metatagKeyword: string;
    discount: number;
    deleteflag: number;
    todaydeals: number;
    condition: number;
    wishliststatus: number;
    isActive: number;
    proCode: string;
}

export class product_adsName_list{
    name: string;
    limit: number;
    offset: number;
}
//Add Banner API //
export class addBanner_data{
    message: string;
    status: number;
    data: Array<addbanner_model>
}
export class addbanner_model{
    title: string;
    content: string;
    image: string;
    link: string;
    position: string;
    status: number;
}

export class addbanner_list{
    title: string;
    content: string;
    image: string;
    link: string;
    position: string;
    status: number;

    constructor(){
        this.title='';
        this.content='';
        this.image='';
        this.link='';
        this.position='';
        this.status=0;
    }
}
// end Add Banner API//

//Banner List API//
export class Banner_data{
   
    status: number;
    message: string;
    data:Array<any>
}

export class banner_model{
    // bannerId:number;
    // title:string;
 
    // content:string;
    // image:string;
    // imagePath:string;
    // link:string;
    // position:string
    // isActive:number;

    manufacturerId:number;
    name:string;
    image:string;
    imagePath:string;
    sortOrder:string;
    isActive:number;
       

   
}

export class banner_list{
    limit: number;
    offset: number;
    count: number;

    constructor(){
        this.limit=0;
        this.offset=0;
        this.count=0;
    }
}
//end Banner List API//
export class productD_model{
    productId: number;
    quantity: number;
    price: number;
    model: string;
    name: string;
    vendorId: string;
    image: string;
    imagePath: string; 
}
//object_localStorage//
export class objectlocalStorage_data{
    countvendor: Array<countvendor_model>
    count: number;
    data: Array<productD_model>
}

export class countvendor_model{
    vendor_id: number;
    vendor_name: string;
}
//end object_localStorage//