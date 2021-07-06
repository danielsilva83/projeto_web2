

import React, { useEffect, useState } from 'react';
import showdown from 'showdown';
import parse from 'html-react-parser';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import ReactMarkdown from "react-markdown";
//import equipeMd from '../../assets/equipe.md';

interface MarkdownProps {
    path: string;
  }

const Markdown:React.FC<MarkdownProps>=(props)=>{
    const [markdown, setMarkdown] = useState("");
    

    useEffect(() => {
        fetch(props.path)
          .then((res) => res.text())
          .then((text) => setMarkdown(text));
      }, []);

      const newProps = {
        ...props,
        plugins: [
          RemarkMathPlugin,
        ],
        renderers: {
          math: (props: {value: string}) => 
            <MathJax.Node formula={markdown} />,
          inlineMath: (props: {value: string}) =>
            <MathJax.Node inline formula={markdown} />
        }
      };
    
      return (
        <MathJax.Provider >
          
          <ReactMarkdown  children={markdown} />
        </MathJax.Provider>
      );
};

export default Markdown;