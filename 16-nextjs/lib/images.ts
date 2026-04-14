export function getImageSrc(image: string, defaultImage = "/imgs/no-cover.png") {
  if (!image || image === "no-cover.png" || image === "no-cover.jpeg") {
    return defaultImage;
  }

  if (image.startsWith("data:")) {
    return image;
  }

  return `/covers/${image}`;
}
