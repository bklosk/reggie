# reggie

Regulatory compliance analyst, powered by [Exa](https://github.com/exa-labs)   
This is deployed on the digitalocean app platform, secrets stored as encrypted env vars (no plaintext keys, sorry)


"wha? huh? it stores the onboarding flow but no sign in?" cookies + [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

## what should I explore?

There are three big functionalities:      
(1) "radar," a fast search for developments in the regulatory environment related to the user     
(2) "watchlist," websets!!! watching for tiny regulation changes over time     
(3) "search," a simple LLM interface marrying gemini 3 flash + exa <3     

## dev setup

```bash
bun install && bun dev
```

Once the dev server is running, open [http://localhost:3000](http://localhost:3000).
