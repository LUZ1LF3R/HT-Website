import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="font-['Space_Grotesk',sans-serif] text-[24px] sm:text-[28px] lg:text-[32px] text-[var(--accent)] mt-8 sm:mt-10 mb-4 sm:mb-5 font-semibold">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-['Space_Grotesk',sans-serif] text-[20px] sm:text-[23px] lg:text-[26px] text-[var(--accent)] mt-6 sm:mt-8 mb-3 sm:mb-4 font-semibold">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-['Space_Grotesk',sans-serif] text-[18px] sm:text-[20px] mt-5 sm:mt-6 mb-2 sm:mb-3 font-semibold">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="font-['Inter',sans-serif] text-[14px] sm:text-[15px] leading-relaxed my-4 sm:my-5">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-none space-y-2 my-5">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-none space-y-2 my-5">
            {children}
          </ol>
        ),
        li: ({ children, ordered, index }) => (
          <li className="flex items-start gap-3">
            {ordered ? (
              <span className="font-['JetBrains_Mono',monospace] text-[var(--accent)] min-w-[1.5rem]">
                {(index ?? 0) + 1}.
              </span>
            ) : (
              <span className="text-[var(--accent)] mt-1">→</span>
            )}
            <span className="font-['Inter',sans-serif] text-[15px] flex-1">
              {children}
            </span>
          </li>
        ),
        code: ({ inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          
          if (!inline && language) {
            return (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={language}
                PreTag="div"
                className="rounded-none my-5 !bg-[var(--bg-secondary)] border border-[var(--divider)]"
                customStyle={{
                  margin: '1.25rem 0',
                  padding: '1.25rem',
                  fontSize: '13px',
                  fontFamily: "'JetBrains Mono', monospace",
                  background: 'var(--bg-secondary)',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }
          
          return (
            <code
              className="font-['JetBrains_Mono',monospace] text-[13px] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--accent)]"
              {...props}
            >
              {children}
            </code>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[var(--accent)] pl-5 my-5 text-[var(--text-secondary)]">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-5">
            <table className="w-full border-collapse border border-[var(--divider)]">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[var(--bg-secondary)]">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="border border-[var(--divider)] px-4 py-2 text-left font-['Space_Grotesk',sans-serif] text-[14px]">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-[var(--divider)] px-4 py-2 font-['Inter',sans-serif] text-[14px]">
            {children}
          </td>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-[var(--text-primary)]">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic">
            {children}
          </em>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}