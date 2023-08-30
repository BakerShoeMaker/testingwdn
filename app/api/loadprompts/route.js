//Fetches the prompts from database.
import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb';

export async  function GET() {
    try{
        const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING);
        const db = await client.db(process.env.MONGODB_DATABASE_NAME);   
        
        const prompts = await db.collection('Testing')
        .find({subject: params}) //param - Need to add what was selected from the drop down menu.
        .sort({_id: -1})
        .toArray(); 
        console.log(prompts);
        client.close();
        return NextResponse.json(
                { status:true,
                   data:prompts 
                })
    }
    
    catch(error){
        return NextResponse.json(
                {  status:false,
                   message:error 
                })
    }
}