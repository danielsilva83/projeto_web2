import React, { useEffect, useState } from 'react';
import {MathpixMarkdown, MathpixLoader} from 'mathpix-markdown-it';

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
    
      return (
        <MathpixLoader>
          
          <MathpixMarkdown text={markdown}/>
          </MathpixLoader>
      );
};

export default Markdown;