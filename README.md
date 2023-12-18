## Getting started

Artemisia AI was built using a [Next.js](https://nextjs.org/) template project that's preconfigured to work with [Replicate's API](https://replicate.com/docs/get-started/nextjs) and [Tailwind](https://tailwindcss.com/) utility-first CSS framwork. It was created for educational purposes and to demonstrate the potential of AI models for content generation.

Artemisia AI uses [Stable Diffusion XL](https://replicate.com/stability-ai/sdxl) (SDXL), an upgraded version of Stable Diffusion generative AI model created by Stability AI. This advanced generative model allows users to generate highly detailed images using shorter text prompts compared to the original Stable Diffusion model. [Replicate API](https://replicate.com) is used to run the model in the cloud. 

The name "Artemisia" is inspired by [Artemisia Gentileschi](https://en.wikipedia.org/wiki/Artemisia_Gentileschi), an Italian Baroque painter.


## Noteworthy files

- [pages/index.js](pages/index.js) - The React frontend that renders the home page in the browser
- [pages/api/predictions/index.js](pages/api/predictions/index.js) - The backend API endpoint that calls Replicate's API to create a prediction
- [pages/api/predictions/[id].js](pages/api/predictions/[id].js) - The backend API endpoint that calls Replicate's API to get the prediction result

## Usage

Clone this repository

```
git clone git@github.com:LeandroBerlin/artemisia-ai.git
```

Install dependencies:

```console
npm install
```

Add your [Replicate API token](https://replicate.com/account#token) to `.env.local`:

```
REPLICATE_API_TOKEN=<your-token-here>
```

Run the development server:

```console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.  


## Screenshot

<img width="707" alt="iguana" src="./public/screenshot.png">
