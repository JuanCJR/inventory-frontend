interface Config {
  api: {
    url: string;
  };
}
export const config: Config = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || "",
  },
};
