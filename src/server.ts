import { app } from "./app.js"
import { env } from "./env/index.js"

app.listen({
    hostname: '0.0.0.0',
    port: env.PORT,
}, () => {
  console.log('🚀 Server is running!')
})
