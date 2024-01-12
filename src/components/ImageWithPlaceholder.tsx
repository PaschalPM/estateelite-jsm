import getBase64 from "@/utils/getLocalBase64";
import Image from "next/image";

type Props = {
  image: {
    url: string;
  };
};
export default async function ImageWithPlaceholder({ image }: Props) {
  const blurredDataUrl = await getBase64(image.url);
  return (
    <Image
      placeholder="blur"
      blurDataURL={blurredDataUrl as unknown as string}
      src={image.url}
      width={1000}
      height={500}
      alt="property"
      sizes="(max-width:500px) 100px, (max-width:1023px) 400px, 1000px "
    />
  );
}
