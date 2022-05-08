import {IsNumberString, IsString, ValidateNested} from "class-validator";
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