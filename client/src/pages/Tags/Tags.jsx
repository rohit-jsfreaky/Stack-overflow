/*import React from 'react'
import LeftSidebar from '../../components/LeftSideBar/LeftSidebar'
import "./Tags.css"

const Tags = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />

      <div className="home-container-2">
        <h1>Tags</h1>
        <p>A tag is a keyword or label that categorizes your question with other, similar questions.</p>
        <p>Using the right tags make it easier for others to find and answer your question</p>
        <div className='tags-list-container'>
          <div className="tag">
            <h5>javascript</h5>
            <p>For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Please include all relevant tags on your question;</p>
          </div>
          <div className="tag">
            <h5>python</h5>
            <p>Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax.</p>
          </div>
          <div className="tag">
            <h5>c#</h5>
            <p>C# (pronounced 'see sharp') is a high level, statically typed, multi-paradigm programming language developed by Microsoft</p>
          </div>
          <div className="tag">
            <h5>java</h5>
            <p>Java is a high-level object oriented programming language. Use this tag when you're having problems using or understanding the language itself.</p>
          </div>
          <div className="tag">
            <h5>php</h5>
            <p>PHP is a widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted scripting language originally designed for server-side web development</p>
          </div>
          <div className="tag">
            <h5>html</h5>
            <p>HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser.</p>
          </div>
          <div className="tag">
            <h5>android</h5>
            <p>Android is Google's mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT).</p>
          </div>
          <div className="tag">
            <h5>css</h5>
            <p>CSS is a representation style sheet language used for describing the look and formatting of HTML, XML documents and SVG elements including colors, layout, fonts, and animations</p>
          </div>
          <div className="tag">
            <h5>Reactjs</h5>
            <p>React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.</p>
          </div>
          <div className="tag">
            <h5>node.js</h5>
            <p>Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8  JavaScript engine and libuv library.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tags*/


// src/pages/Tags/Tags.js
import React from 'react';
import LeftSidebar from '../../components/LeftSideBar/LeftSidebar';
import { useTranslation } from 'react-i18next';
import "./Tags.css";

const Tags = () => {
  const { t } = useTranslation();

  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
        <h1>{t('tags')}</h1>
        <p>{t('description1')}</p>
        <p>{t('description2')}</p>
        <div className='tags-list-container'>
          {Object.keys(t('tagsList', { returnObjects: true })).map((key) => (
            <div className="tag" key={key}>
              <h5>{t(`tagsList.${key}.title`)}</h5>
              <p>{t(`tagsList.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags;
