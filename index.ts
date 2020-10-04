import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts'

const app = new Application()
const router = new Router()
const port = 3000
const rootDir = Deno.cwd()

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${rootDir}/public`,
    index: 'index.html',
  })
})

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`)
})

app.addEventListener('error', (err) => {
  console.error(`Error: ${err}`)
})

await app.listen({ port })
