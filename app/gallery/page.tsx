import fs from "fs";
import path from "path";
import PageIntro from "../components/PageIntro";

export const metadata = { title: "Gallery — Anh Nguyen" };

export default function Gallery() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  let images: string[] = [];
  try {
    if (fs.existsSync(galleryDir)) images = fs.readdirSync(galleryDir).filter((file) => [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(path.extname(file).toLowerCase()));
  } catch (error) { console.error("Error reading gallery directory:", error); }

  return (
    <>
      <PageIntro eyebrow="Off the clock" title="A few scenes from a life in motion.">
        <p>Small records of people, places, work, and the moments around them.</p>
      </PageIntro>
      {images.length > 0 ? <div className="gallery-grid">{images.map((image, index) => <figure className="gallery-image" key={image}><img src={`/gallery/${image}`} alt={`A moment from Anh Nguyen's gallery, image ${index + 1}`} /></figure>)}</div> : <p className="essay">No images found yet.</p>}
    </>
  );
}
