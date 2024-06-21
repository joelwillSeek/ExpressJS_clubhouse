import Messages from "../models/Messages";
import { NextFunction, Request, Response } from "express";
import { format } from "date-fns";

export const dashboard_firstPage = async (req: Request, res: Response) => {
  //author firstname can be accessed by msg.author.fullName
  const allMessages = await Messages.find({},"timeStamp description author _id").populate("author");
  console.log(allMessages)
  if (req.user == undefined) return res.redirect("/logIn");
  return res.render("dashboard", {
    user: req.user,
    msg: allMessages,
    error: null,
  });
};

export const dashboard_createNewMessage = async (req: any, res: Response) => {
  if (!req.isAuthenticated()) return res.redirect("/login");

  try {
    const message = req.body.messageValue;
    const formatedCurrentDate = format(new Date(), "dd/mm/yy");
    console.log("here: ", formatedCurrentDate, message);
    const newMessageCreated = await new Messages({
      timeStamp: formatedCurrentDate,
      description: message,
      author: req.user.id,
    });
    await newMessageCreated.save();
    return res.redirect("/dashboard");
  } catch (err) {
    return res.render("error", { locals: { message: err } });
  }
};


export const dashboard_logOut=async(req:Request,res:Response,next:NextFunction)=>{
  req.logOut(err=>{
    if(err)return next(err)
      res.redirect("/")
  })
}

export const dashboard_deleteMessage=async (req:Request,res:Response)=>{
  const message:string=req.body.msg;
  try{
    console.log("god so far",message)
    const allMessages = await Messages.deleteOne({description:message.trim()})
    if (allMessages.deletedCount === 1) {
      // Document was successfully deleted
      // Handle further logic if needed
      console.log('Document deleted successfully');
      return res.json({success:true})
  } else {
      // Handle case where no document was deleted (not found)
      console.log('Document not found or not deleted');
  }

  }catch(err){
    return res.render("error", { locals: { message: err } });
  }
 

}