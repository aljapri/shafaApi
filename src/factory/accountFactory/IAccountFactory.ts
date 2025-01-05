import IAccountCreation from "../../types/IAccountCreation";

export default interface IAccountFactory{
    CreateObject(serialNumber:string):IAccountCreation|null;
}
