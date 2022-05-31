import useSWR from "swr";

export const fetcher = (url: string) =>
  fetch(url).then((datas) => datas.json());

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
