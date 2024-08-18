import { Server } from "http"
import app from "./app"
import config from "./app/config"
import mongoose from "mongoose";

const port = config.port 
let server: Server;

async function main () {
    try {
        await mongoose.connect(config.mongo_url as string)

        server = app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
          })
    } catch (error) {
        console.log('An error is going on connecting server.');
        console.log(error);
    }
}


main();


process.on('unhandledRejection', () => {
    console.log('😈 unhandledRejection is detected. Shutting down...');

    if(server){
        server.close(() =>{
            process.exit(1)
        })
    }

    process.exit(1)
})


process.on('uncaughtException', () => {
    console.log('😈 uncaughtException is detected. Shutting down...');

    process.exit(1)
})

