import { MongoClient } from 'mongodb'

async function handler(req,res) {

    if (req.method == 'POST') {
        const { email, name, message } = req.body

        //Validate cliente side informations
        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
          ) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }
        
        //After is validated, store in a DB
        const newMessage = {
            email, name, message
        }

        const client = new MongoClient(
            'mongodb+srv://miguel:cgi@cluster0.swnzuoc.mongodb.net/courseTest?retryWrites=true&w=majority'
        )
        
        try {
            await client.connect()
        } catch (error) {
            res.status(500).json({ message: 'Error connecting to db' })
        }

        const db = client.db()

        try {
            const result = await db.collection('messages').insertOne(newMessage)
            newMessage.id = result.insertedId
        } catch (error) {
            client.close()
            res.status(500).json({ message: 'Storing message failed' })
        }
        
        client.close()

        res.status(201).json({ message: 'Success', message: newMessage })
    }
}

export default handler;