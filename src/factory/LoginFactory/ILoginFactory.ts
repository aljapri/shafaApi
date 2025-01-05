import IAccountLogin from "../../types/IAccountLogin";


export default interface ILoginFactory{
    CreateObject(serialNumber:string):IAccountLogin|null;
}
