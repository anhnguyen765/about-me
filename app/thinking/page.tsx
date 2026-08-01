import MDXRenderer from "../components/MDXRenderer";
import PageIntro from "../components/PageIntro";

export const metadata = { title: "Thinking — Anh Nguyen" };

const latestThinking = `
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
`;

export default function Thinking() {
  return (
    <>
      <PageIntro eyebrow="Mental models / notes" title="The thinking behind the work.">
        <p>A small collection of notes on problem definition, systems, trade-offs, and technology — usually written to make my own thinking a little more precise.</p>
      </PageIntro>
      <article className="essay">
        <p className="eyebrow">Latest essay / Vietnamese</p>
        <h3>Mình dùng AI trong Fintech ra sao</h3>
        <MDXRenderer source={latestThinking} />
        <a className="button-link" href="https://substack.com/home/post/p-196285345" target="_blank" rel="noreferrer">Read the full essay <span aria-hidden="true">↗</span></a>
      </article>
    </>
  );
}
