import { Request, Response, NextFunction } from 'express';
import { Model, Document, FilterQuery } from 'mongoose';
import catchAsync from './../utils/catchAsync';
import AppError from './../utils/appError';
import APIFeatures from './../utils/ApiFeatures';

class CRUD<T extends Document> {
  public model: Model<T>;
  constructor (model: Model<T>){
    this.model = model;
  }
  deleteOne = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await this.model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }

      res.status(204).json({
        status: 'success',
      });
    });

  updateOne = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      const doc = await this.model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      console.log(doc)

      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    });

  createOne = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await this.model.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    });

  getOne = (popOptions?: string) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      let query = this.model.findById(req.params.id);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    });

  getAll = () =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {

      const features = new APIFeatures(this.model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const doc = await features.query;

      res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
          data: doc
        }
      });
    });
}

export default CRUD;
