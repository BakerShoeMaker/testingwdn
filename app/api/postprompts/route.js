//Fetches the prompts from database.


import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req, res) {
  try {
    const data = req.body;
    //const data = JSON.parse(req.body);
    //const data = req.body.json();
    const { subject, topic, date_added, type, writing_prompt } = data;
    console.log("-------------------------------------------")
    console.log("Server: Type of data: " + typeof data);
    console.log("Server: Route.js side: " + JSON.stringify(data, null, 2));
    console.table(data)
    console.log("-------------------------------------------")
    if (!subject || !type || !topic || !writing_prompt || !date_added)
    { 
      res.status(400).json({ message: "Missing required fields." });
      return;    
  }
   
    const client = await MongoClient.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    const db = await client.db(process.env.MONGODB_DATABASE_NAME);
    const prompts = await db
      .collection("Testing")
      .insertOne(data);      
    client.close();
    return NextResponse.json({ message: "Prompt added." }, {status: 201});
    //res.status(201).json({message: "Prompt added"});
  } 
  catch (error) {
    return NextResponse.json({ status: false, message: "This is the error: " + error });
    //res.status(500).json({status:false, message: "This is the error: " + error});
  }
}


