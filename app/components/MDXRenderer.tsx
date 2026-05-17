import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: (props: any) => <h1 {...props} />,
  h2: (props: any) => <h2 {...props} />,
  h3: (props: any) => <h3 {...props} />,
  p: (props: any) => <p {...props} />,
  ul: (props: any) => <ul {...props} />,
  ol: (props: any) => <ol {...props} />,
  li: (props: any) => <li {...props} />,
  a: (props: any) => <a {...props} />,
  blockquote: (props: any) => <blockquote className="blockquote" {...props} />,
};

export default function MDXRenderer({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
