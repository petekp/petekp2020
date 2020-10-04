import ytChannels from './youtube.ts'
import { renderFile, configure } from 'https://deno.land/x/eta@v1.11.0/mod.ts'

const viewPath = `${Deno.cwd()}/views/`

configure({
  views: viewPath,
})

let templateResult = await renderFile('./index', {
  message: 'stuff',
  title: 'huh',
  channels: ytChannels,
})

const encoder = new TextEncoder()

const templatize = (channel: any) => `
  <li>
    <a class="name" href="${channel.url}">${channel.name}</a>
  </li>
`

let structure = ''
for (let channel of ytChannels) {
  structure += templatize(channel)
}

var compiled = encoder.encode(templateResult)

Deno.writeFileSync('public/youtube.html', compiled)
