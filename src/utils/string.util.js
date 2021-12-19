module.exports = {
  getYoutubeLink(string) {
    const youtubeRegex =
      /(?:http:|https:)*?\/\/(?:www\.|)(?:youtube\.com|m\.youtube\.com|youtu\.|youtube-nocookie\.com).*(?:v=|v%3D|v\/|(?:a|p)\/(?:a|u)\/\d.*\/|watch\?|vi(?:=|\/)|\/embed\/|oembed\?|be\/|e\/)([^<&?%#\/\n]*)/;
    const youtubeMatch = string.match(youtubeRegex);

    if (youtubeMatch && youtubeMatch.length) {
      return {
        url: `www.youtube.com/watch?v=${youtubeMatch[1]}`,
        id: youtubeMatch[1],
      };
    }
    return undefined;
  },
};
