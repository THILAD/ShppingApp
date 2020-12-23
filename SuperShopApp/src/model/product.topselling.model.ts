export class topselling_data{
    status: number;
    message: string;
    data: topselling_model;
}

export class topselling_model{
    ordercount : number;
    productId : number;
    product : Array<PTopSellingArray>
    productImage : Array<PTopSellingImage>
}

export class PTopSellingArray{
    productID : number;
    vendor : number;
    image : string;
    imagePath : string;
    proce : string;
    name : string;
    description : string;

}

export class PTopSellingImage{
    containerName : string;
    image : string
    productId : number;
}

export class topselling_list{
    vendorid : number;
}
