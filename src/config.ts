interface Config {
  api: {
    url: string;
  };
}

export const config: Config = {
  api: {
    url: process.env.API_URL || "",
  },
};
