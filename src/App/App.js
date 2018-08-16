import React  from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import marked from 'marked';
import './App.css';

class App extends React.Component {

  constructor ( props ) {
    super( props );
    
    this.state = {
      markdown : ''
    };
  }

  handleTextArea = evt => {
    this.setState( {
      markdown : evt.target.value
    } );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section id="writing-area">
          <div className="container">
            <div className="menu">MARKDOWN</div>
            <textarea id="editor" value={this.state.markdown} onChange={this.handleTextArea} />
          </div>
          <div className="container">
            <div className="menu preview">PREVIEW</div>
            <div
              id="preview"
              dangerouslySetInnerHTML={ {
                __html: marked( this.state.markdown, { renderer : this.renderer, sanitize : true } )
              } }>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }

  componentWillMount( ) {

    marked.setOptions( { breaks : true } );
    
    this.renderer = new marked.Renderer( );
    this.renderer.link = ( href, title, text ) => {
      if ( href.indexOf('#') === 0 ) return `<a rel="noopener noreferrer" href="${href}">${text}</a>`;
      return `<a target="_blank" rel="noopener noreferrer" href="${href}">${text}</a>`;
    }

    const placeholder = require( './Assets/placeholder.md' );
  
    fetch( placeholder ).then( res => res.text( ) )
      .then( text => {
        this.setState( {
          markdown : text
        } )
      } )
  }

}

export default App;
