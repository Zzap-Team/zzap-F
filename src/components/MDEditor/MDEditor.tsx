import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { ToolBar } from './ToolBar';

export function MDEditor({_content, propsFunction}) {
  const [content, setContent] = useState(_content);
  const [cursor, setCursor] = useState({start: 0, end: 0});
  useEffect(() => {
    propsFunction(content);
  }, [content]);
  const insertHeader = (size) =>{
    const lines = content.split('\n');
    let cur = 0;
    const newLines = lines.map((line) => {
      if(cur <= cursor.end && cursor.end <= cur + line.length){
        for(let i = 0; i < line.length; i++){
          if(line[i] == ' '){
            line = line.slice(i + 1, line.length);
            break;
          } else if(line[i] != '#')
          break;
        }
        let header = '';
        for(let i = 0; i < size; i++)
          header += '#';
        line = header + ' ' + line;
      }
      cur += line.length + 1;
      return line;
    });
    let newContent = '';
    for(const line in newLines)
      newContent += newLines[line] + "\n";
    newContent.slice(0, -1);
    setContent(newContent.slice(0, -1));
  };

  const insertTypography = (type) => {
    let newContent = '';
    let checkSymbol ='';
    let addSymbol = '';
    if(type=='bold'){
      checkSymbol = '*';
      addSymbol = '**'
    } else if(type=='italics'){
      checkSymbol = '_';
      addSymbol = '_'
    } else if(type == 'strikethrough'){
      checkSymbol = '~';
      addSymbol = '~~'
    }
    if(content[cursor.start] == checkSymbol && 
      (checkSymbol == '_' || content[cursor.start + 1] == checkSymbol) &&
      (checkSymbol == '_' || content[cursor.end - 2] == checkSymbol) &&
      content[cursor.end - 1] == checkSymbol && 
      cursor.end - cursor.start >= addSymbol.length*2) {
        newContent = content.slice(0, cursor.start) +
      content.slice(cursor.start + addSymbol.length, cursor.end - addSymbol.length) +
      content.slice(cursor.end, content.length);
      setCursor({start: cursor.start, end: cursor.end-(addSymbol.length*2)});
    } else{
      newContent = content.slice(0, cursor.start) + addSymbol +
      content.slice(cursor.start, cursor.end) + addSymbol + 
      content.slice(cursor.end, content.length);
      setCursor({start: cursor.start, end: cursor.end+(addSymbol.length*2)});
    }
    setContent(newContent);
  };

  return (
    <Main>
      <ToolBar insertHeader={insertHeader} 
              insertTypography={insertTypography}/>
      <Editor>
        <Content
          onChange={(e) => {
              setContent(e.target.value);
              propsFunction(e.target.value);
              cursor.start = e.target.selectionStart;
              cursor.end = e.target.selectionEnd;
            }}
          onMouseUp={(e) => {
            cursor.start = e.target.selectionStart;
            cursor.end = e.target.selectionEnd;
          }}
          value={content}
          placeholder="당신의 마음을 적어주세요."
        />
      </Editor>
      
    </Main>
  );
}



const Main = styled.div`
  width: 100%;

`;

const Editor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  background-color: transparent;
  outline: none;
`;

const Content = styled.textarea`
flex-grow: 1;
  height: 30rem;
  font-size: 1rem;

	border: 0px;
  background-color: transparent;
  outline: none;
`;

