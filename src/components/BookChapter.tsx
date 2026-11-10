import Markdown, { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"; // fonts and layout for rendered formulas

// react-markdown gives every component an extra `node` prop (its piece of the
// syntax tree). HTML tags don't know it, so we drop it before passing props on.
function htmlProps<P extends { node?: unknown }>(props: P): Omit<P, "node"> {
  const rest = { ...props };
  delete rest.node;
  return rest;
}

// How each Markdown element looks on the page. Markdown has no styles of its
// own, so we swap every tag for our own Tailwind-styled version.
// Headings shift down one level: the page already has <h1> (topic name) and
// <h2> (section title), so "## Ruch jednostajny" in the file becomes an <h3>.
const components: Components = {
  // "# Kinematyka" at the top of the file is the chapter title for the printed
  // book; on the website the page header already shows it, so we skip it
  h1: () => null,
  h2: (props) => (
    <h3 className="mt-12 mb-4 font-display text-2xl font-bold" {...htmlProps(props)} />
  ),
  h3: (props) => (
    <h4 className="mt-8 mb-3 text-lg font-bold" {...htmlProps(props)} />
  ),
  p: (props) => <p className="my-4" {...htmlProps(props)} />,
  ul: (props) => (
    <ul className="my-4 list-disc space-y-1.5 pl-6 marker:text-accent" {...htmlProps(props)} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 marker:font-mono marker:text-accent" {...htmlProps(props)} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...htmlProps(props)} />
  ),
  // Links to other sites (e.g. a video) open in a new tab
  a: (props) => {
    const isExternal = props.href?.startsWith("http");
    return (
      <a
        {...htmlProps(props)}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-medium text-accent underline underline-offset-2 hover:no-underline"
      />
    );
  },
  // "> ..." in Markdown: a highlighted box, used for intuitions and key takeaways
  blockquote: (props) => (
    <blockquote
      className="my-6 rounded-r-2xl border-l-4 border-marker-yellow bg-marker-yellow/8 px-5 py-1"
      {...htmlProps(props)}
    />
  ),
  // Images go in public/book/<slug>/ and are written as ![opis](/book/<slug>/plik.png).
  // Plain <img>: we don't know their size up front, and lazy loading is enough here.
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...htmlProps(props)}
      alt={props.alt ?? ""}
      loading="lazy"
      decoding="async"
      className="my-6 w-full rounded-2xl border border-border bg-paper"
    />
  ),
  hr: (props) => (
    <hr className="my-10 border-border" {...htmlProps(props)} />
  ),
};

// One chapter of the book, rendered from Markdown. remark-math finds $...$ and
// $$...$$, rehype-katex turns them into HTML+CSS formulas. All of that happens
// at build time, so the reader downloads no JavaScript for it.
export default function BookChapter({ markdown }: { markdown: string }) {
  return (
    // max-w-prose: ~65 characters per line, comfortable for long reading.
    // Long display formulas scroll sideways on a phone instead of breaking the layout.
    <div className="max-w-prose text-[17px] leading-relaxed text-foreground/90 [&_.katex]:text-[1.08em] [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-2 [&>*:first-child]:mt-0">
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
