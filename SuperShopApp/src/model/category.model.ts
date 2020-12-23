
export class SpecificCategory_model{
    categoryId: number;
    name: string;
    image: string;
    imagePath: string;
    parentInt: number;
    sortOrder: number;
    metaTagTitle: string;
    metaTagDescription: string;
    metaTagKeyword: string;
    children:Array<SpecificCategory_model>
}

export class SpecificCategory_List{
    categoryId: number;

    constructor(){
        this.categoryId=-1;
    }
}


//end Specific Category List
//Images //
export class Images_model{
    protectId: number;
    image: string;
    containerName: string;
    defaultImage: number;
}
//Custom Product List API//
export class CustomProduct_data{
    status: number;
    message: string;
    data:Array<CustomProduct_model>
}

export class CustomProduct_model{
    productId: number;
    price: number;
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
    Images: Images_model
}
export class CustomProduct_List{
    limit: number;
    offset: number;
    manufacturerId: number;
    categoryId: number;
    priceFrom: number;
    priceTo	: number;
    price: string;
    condition: number;
    keyword: string;

    constructor(){
        this.limit=0;
        this.offset=0;
        this.manufacturerId=0;
        this.categoryId=-1;
        this.priceFrom=0;
        this.priceTo=0;
        this.price='';
        this.condition=0;
        this.keyword='';
    }
}


//end Custom Product List API///