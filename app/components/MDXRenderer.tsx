import { MDXRemote } from 'next-mdx-remote/rsc';
import type { ComponentPropsWithoutRef } from 'react';

const components = {
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => <blockquote className="blockquote" {...props} />,
};

export default function MDXRenderer({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
