// LocationCreation.service.ts
import mongoose, { ClientSession } from "mongoose";
import { ILocation, Location } from "../../models/Location.model";
import HttpResponse from "../../utils/HttpResponse";

export default class LocationCreationService {
  public async createLocation(locationData: any, session: ClientSession) {
      const {city,suburb,address,coordinates} = locationData;
      
      const location = await Location.create([{city,suburb,address,coordinates}], { session });
      return location[0];
  }
}
