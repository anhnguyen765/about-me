export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="eyebrow">Based in Vietnam · Thinking globally</p>
      <p>© {new Date().getFullYear()} Anh Nguyen.</p>
      <a href="mailto:anh.nguyen762005@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
    </footer>
  );
}
