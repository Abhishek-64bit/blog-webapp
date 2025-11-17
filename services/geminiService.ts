import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { GenerateContentConfig } from '../types';

/**
 * Encodes a Uint8Array to a base64 string.
 * @param bytes The Uint8Array to encode.
 * @returns The base64 encoded string.
 */
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Decodes a base64 string to a Uint8Array.
 * @param base64 The base64 string to decode.
 * @returns The decoded Uint8Array.
 */
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Decodes raw PCM audio data into an AudioBuffer.
 * @param data The Uint8Array containing raw PCM data.
 * @param ctx The AudioContext to create the AudioBuffer.
 * @param sampleRate The sample rate of the audio data.
 * @param numChannels The number of audio channels.
 * @returns A Promise that resolves to an AudioBuffer.
 */
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


export async function generateTextContent(
  prompt: string,
  modelName: string = 'gemini-2.5-flash',
  config?: GenerateContentConfig,
): Promise<string> {
  // Fix: Changed API key access to comply with @google/genai guidelines.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is not defined. Please ensure the environment variable is set.");
    return "Error: API_KEY not configured.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: config,
    });

    const text = response.text;
    if (!text) {
      console.warn("Gemini API returned an empty text response.");
      return "No content generated.";
    }
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    return "An unknown error occurred during content generation.";
  }
}

export async function generateImageContent(
  prompt: string,
  modelName: string = 'gemini-2.5-flash-image',
): Promise<string | null> {
  // Fix: Changed API key access to comply with @google/genai guidelines.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is not defined. Please ensure the environment variable is set.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    const base64ImageBytes = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64ImageBytes) {
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      console.warn("Gemini API did not return image data.");
      return null;
    }
  } catch (error) {
    console.error("Error calling Gemini Image API:", error);
    if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
    }
    return null;
  }
}