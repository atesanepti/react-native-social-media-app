export const REGEXP = {
  MENTION: /@[a-z]+/gi,
  URL: /(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?/gi,
  MENTION_URL:
    /((https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?)|(@[a-z]+)/gi,
  LAST_MENTION: /@[a-z]+(?!.*@[a-z]+)/,
};
