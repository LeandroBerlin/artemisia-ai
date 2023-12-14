import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer";
import Spinner from "../components/spinner";
import Link from "next/link";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      //console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    <div className="container my-10 p-6 radius shadow-2xl max-w-2xl mx-auto p-5">
      <Head>
        <title>Artemisia</title>
      </Head>

      <h1 className="py-6 text-center font-bold text-2xl">
        Artemisia - Generative AI art
      </h1>
      <p className="text-md text-justify">Artemisia uses <Link href="https://replicate.com/stability-ai/sdxl">Stable Diffusion XL</Link> (SDXL), an upgraded version of Stable Diffusion generative AI model created by Stability AI. This advanced generative model allows users to generate highly detailed images using shorter text prompts compared to the original Stable Diffusion model. <Link href="https://replicate.com">
        Replicate API
      </Link> is used to run the model in the cloud. The name is inspired by <Link href="https://en.wikipedia.org/wiki/Artemisia_Gentileschi">Artemisia Gentileschi</Link>, an Italian Baroque painter. </p>

      <form className="w-full flex mt-6" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-grow"
          name="prompt"
          placeholder="Enter a prompt to create an image"
        />
        <button className="button" type="submit">
          Create
        </button>
      </form>

      {error && <p className="py-3 text-sm opacity-50"><span className="bg-white text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Error</span>
        <span className="bg-white text-red-800 text-sm font-medium ">{error}</span>
      </p>}

      {prediction && !error && (
        <>
          <p className="py-3 text-sm opacity-50">
            <div className={`${prediction.status !== "succeeded" ? "text-blue-800 border-blue-400 " : "border-green-400 text-green-800"} inline-block  text-xs font-medium me-2 px-2.5 py-0.5 rounded border`}>Status</div>
            <div className="inline-block"><span className="capitalize">{prediction.status}</span> {prediction.status != "succeeded" ? <Spinner /> : `in ${prediction.metrics.predict_time.toFixed(2)} sec.`}</div>
          </p>
          {prediction.output && (
            <div className="image-wrapper mt-1">
              <Image
                fill
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100%"
              />
            </div>
          )}

        </>
      )}
      <Footer />
    </div >
  );
}
