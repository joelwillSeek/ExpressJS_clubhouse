import Messages from "../models/Messages";
import { Request, Response } from "express";
import { format } from "date-fns";

export const dashboard_firstPage = async (req: Request, res: Response) => {
  //author firstname can be accessed by msg.author.fullName
  const allMessages = await Messages.find({},"timeStamp description author").populate("author");
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
