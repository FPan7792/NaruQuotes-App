// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import useSWR from "swr";
import fetcher from "./fetcher";

export type QuoteObject = {
  anime: string;
  character: string;
  quote: string;
};

type Data = {
  name: string;
};

export function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: "John Doe" });
}

// export function getRandomQuote() {

// }

// export const getRandomQuote = () => {
//   const { data, error } = useSWR(
//     "https://animechan.vercel.app/api/quotes/anime?title=naruto",
//     fetcher
//   );

//   return {
//     user: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

export const useGetRandomQuote = () => {
  const { data, error } = useSWR(
    "https://animechan.vercel.app/api/quotes/anime?title=naruto",
    fetcher
  );

  if (error) {
    return {};
  } else return { list: data, isLoading: !error && !data, isError: error };
};

export const useGetCharacterQuote = (characterName: string) => {
  const { data, error } = useSWR(
    `https://animechan.vercel.app/api/quotes/character?name=${characterName}`,
    fetcher
  );

  return {
    list: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Creer les routes pour :

// GENERER UNE QUOTE NARUTO ALEATOIREMENT
// ELLE APPARAIT AVEC L IMAGE DU PERSONNAGE EN QUESTION

// GENERER UNE QUOTE ALEATOIREMENT PARMI L'ENSEMBLE EN FONCTION DUN PERSONNAGE CHOISI
// GENERER UNE IMAGE PARMI PLUSISEURS DU PERSONNAGE EN QUESTION SI IMAGE IL Y A
// SINON GENERER UNE IMAGE ALEATOIREMENT PARM PLUSIEURS CHOIX

// UTLISER LE CONTEXTE POUR CHANGER LE THEME DU SITE EN FONCTION DU CHOIX DU USER
