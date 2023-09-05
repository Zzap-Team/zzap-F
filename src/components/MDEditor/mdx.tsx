import {react} from 'react';

export const MDXconverter = (text: string) : React.ReactElement => {
    const lines = text.split('\n');
    return (<div>
        {
            lines.map((line) => 
                <div key={line} dangerouslySetInnerHTML={{__html: typographyParser(line)}}></div>
            )
        }
    </div>);
}

const typographyParser = (line) => {
    line = line.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
    line = line.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
    line = line.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
    line = line.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
    line = line.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
    line = line.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
    
    line = line.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
    line = line.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
    line = line.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');
    return line;
};