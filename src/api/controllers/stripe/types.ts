import {IsNumber, IsNumberString, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class ReqBodyMetadata {
    @IsNumberString()
    telegramId!: string;
}
class ReqObjectData {
    @IsString()
    customer!: string;

    @IsString()
    payment_link!: string;

    @IsString()
    subscription!: string;

    @ValidateNested()
    @Type(()=>ReqBodyMetadata)
    metadata!:ReqBodyMetadata;
};

class ReqBodyData{
    @ValidateNested()
    @Type(()=>ReqObjectData)
    object!:ReqObjectData;
}
export class ReqBody{
    @IsString()
    type!:string;

    @ValidateNested()
    @Type(()=>ReqBodyData)
    data!:ReqBodyData;
}


class Subscription{
    @IsString()
    subscription!: string;

    @IsNumber()
    current_period_end!: number;
}
export class ReqBodySubscriptionUpdated{
    @IsString()
    type!:string;

    @ValidateNested()
    @Type(()=>Subscription)
    data!:Subscription;
}