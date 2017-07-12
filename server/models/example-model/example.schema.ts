import * as mongoose from "mongoose" ;

export interface IExample extends mongoose.Document {
  firstname: string;
  lastname?: number;
  username: string;
};

export const ExampleSchema = new mongoose.Schema({
  firstname: {type:String, required: true},
  lastname: Number,
  username: {type:String, required: true}
});

export const Example = mongoose.model<IExample>('Example', ExampleSchema);;
