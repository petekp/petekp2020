import { Application, send } from 'https://deno.land/x/oak/mod.ts'
import ytData from './youtube.ts'

const app = new Application()
const port = 3000
const dirname = Deno.cwd()

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: 'index.html',
  })
})

await app.listen({ port })
