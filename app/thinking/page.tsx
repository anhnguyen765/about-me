import MDXRenderer from "../components/MDXRenderer";

export const metadata = {
  title: "Thinking — Anh Nguyen",
};

const latestThinking = `
### Mình dùng AI trong Fintech ra sao

Có một điều mình để ý rất rõ trong khoảng những năm gần đây: AI không còn là công cụ hỗ trợ, mà đang dần trở thành một lớp hạ tầng cho cách chúng ta suy nghĩ.

Ở vai trò Technical Product Owner trong fintech, mình không dùng AI để viết caption hay thử prompt cho vui. Mình dùng nó trong cách phân tích requirement, mổ xẻ flow nghiệp vụ, review edge case, thậm chí challenge lại solution của chính mình.

Với mình, AI như một decision engine:
- Fraud detection dựa trên model scoring real-time.
- Risk segmentation dựa trên behavioural pattern.
- Automation dựa trên confidence threshold.

Và mỗi decision đó đều có cost thật:
- False positive → từ chối nhầm user mang lại value lớn.
- False negative → mở cửa cho fraud.
- Optimise sai metric → tăng revenue ngắn hạn, giảm trust dài hạn.

Vì vậy, điều mình quan tâm không phải “AI thông minh đến đâu”, mà là: “Mình có đủ tỉnh táo để không giao toàn bộ tư duy của mình cho AI không?”

*Trích đoạn bài viết mới nhất trên Substack.*
`;

export default function Thinking() {
  return (
    <div>
      <h1>Thinking</h1>
      <p>
        This section represents my mental models and product thinking. It focuses on problem definition, reasoning process, trade-offs, and final insights.
      </p>
      
      <div style={{ marginTop: "3rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
        <p className="structural" style={{ marginBottom: "1rem", color: "var(--color-accent)" }}>LATEST ESSAY</p>
        <MDXRenderer source={latestThinking} />
        
        <div style={{ marginTop: "2rem" }}>
          <a 
            href="https://substack.com/home/post/p-196285345" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: "inline-block", padding: "0.75rem 1.5rem", background: "var(--color-accent)", color: "#fff", fontWeight: 500, borderRadius: "4px", fontSize: "0.9rem" }}
          >
            Read the full essay on Substack →
          </a>
        </div>
      </div>
    </div>
  );
}
