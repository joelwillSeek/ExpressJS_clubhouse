import mongoose,{Schema,Document} from "mongoose";

interface IUser extends Document{
  fullName:String;
  email:String;
  password:String;
  membership:Boolean;
  isAdmin:Boolean;
}

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: String,
  password: {
    type: String,
    required: true,
  },
  membership: Boolean,
  isAdmin: Boolean,
});

export default mongoose.model<IUser>("Users", userSchema); 
