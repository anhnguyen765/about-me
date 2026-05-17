import fs from 'fs';
import path from 'path';

export const metadata = {
  title: "Gallery — Anh Nguyen",
};

export default function Gallery() {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  let images: string[] = [];

  try {
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      images = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      });
    }
  } catch (error) {
    console.error("Error reading gallery directory:", error);
  }

  return (
    <div>
      <h1>Gallery</h1>
      <p>
        A collection of moments from my life.
      </p>

      <div style={{ marginTop: "3rem" }}>
        {images.length > 0 ? (
          <div style={{
            columnWidth: "280px",
            columnGap: "1.5rem",
            width: "100%"
          }}>
            {images.map((img, i) => (
              <div key={i} style={{ breakInside: "avoid", marginBottom: "1.5rem" }}>
                <img
                  src={`/gallery/${img}`}
                  alt={`Gallery image ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "8px",
                    border: "1px solid rgba(0,0,0,0.1)"
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: "3rem",
            border: "1px dashed rgba(0,0,0,0.2)",
            borderRadius: "8px",
            textAlign: "center",
            color: "var(--color-primary)",
            opacity: 0.8
          }}>
            <p className="structural" style={{ marginBottom: "1rem" }}>NO IMAGES FOUND</p>
            <p>
              To populate this gallery, just drag and drop your photos into the <strong>public/gallery</strong> folder.
            </p>
            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", opacity: 0.8 }}>
              Supported formats: .jpg, .jpeg, .png, .gif, .webp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
