const fetcher = (url: string) => fetch(url).then((datas) => datas.json());

export default fetcher;
