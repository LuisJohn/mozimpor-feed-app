import { NextResponse } from 'next/server'
import fs from  'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'feedback.json')

export async function GET(){
    try{
        if(!fs.existsSync(dataFile)){
            return NextResponse.json({feedbacks: []})
        }
        const data = fs.readFileSync(dataFile, 'utf-8')
        const feedbacks = JSON.parse(data)
        return NextResponse.json({ feedbacks })
    } catch(error){
        console.error("Error reading feedback data")
        return NextResponse.json({
            error: 'Error reading feedback'},
        {status: 500})
    }
}

export async function POST(req: Request){
    try{
        const feedback = await req.json()
        let feedbacks = []

        if(fs.existsSync(dataFile)){
            const data = fs.readFileSync(dataFile, 'utf-8')
            feedbacks = JSON.parse(data)
        }

        feedbacks.push(feedback)

        if (!fs.existsSync(path.dirname(dataFile))) {
            fs.mkdirSync(path.dirname(dataFile), { recursive: true })
        }

        fs.writeFileSync(dataFile, JSON.stringify(feedbacks, null, 2))

        return NextResponse.json({ success: true })
    }catch(error){
        console.error("Error saving feedback", error)
        return NextResponse.json({error: 'Error saving feedback'}, {status: 500})
    }
}
