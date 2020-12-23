//vendor  product//
export class vendorProduct_data{
    message: string;
    status: number;
    data: Array< vendorProduct_model>
}

export class vendorProduct_model{
    productId : number;
    sku : string;
    vendor: number;
    quantity: number;
    image : string;
    imagePath: string;
    price : number;
    name: string;
    todayDeals: number;
    isActive: number;
    productImage: vendorPImage_model;

}

    export class vendorPImage_model{
        createdDate: string;
        productImageId: string;
        productId: string;
        image: string;
        containerName: string;
    }

export class vendorProduct_list{
    vendorid: number;
    keyword: string;
    sku: string;
    status: string;
    limit: number;
    offset: number;

    constructor(){
        this.vendorid= -1;
        this.keyword='';
        this.sku='';
        this.status='';
        this.limit = -1;
        this.offset = -1;
    }
}
//end vendor product//

// vendor profile//
    export class vendorProfile_data{
        message: string;
        status: number;
        data: vendorProfile_model
    }

    export class vendorProfile_model{
        createdBy: string;
        createdDate: string;
        modifiedBy: string;
        modifiledDate: string;
        vendor_id: number;
        vendor_name: string;
        email: string;
        phone: string;
        localtion: string;
        isActive: number;
        img : string;
        minimun: number;
        img_card: string;
    }

    export class vendorProfile_list{
        id : number;
        constructor(){
            this.id= -1;
        }
    }
//end vendor profile//