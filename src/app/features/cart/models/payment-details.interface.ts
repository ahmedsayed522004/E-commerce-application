import { Session } from "inspector/promises";

export interface PaymentDetails {
}

export interface PaymentDetailsRespnce{
    status:string;
    session:PaymentDetails;
}

export interface PaymentDetails{
    url:string
    succes_url:string
    cancel_url:string
}
