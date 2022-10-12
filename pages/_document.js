import Document, { Html, Head, NextScript, Main } from 'next/document'

/*
Allows us to define the general structure of our page, and for example set an attribute on the HTML element 
itself, or add extra entry points for react portal

React portals => Allows us to render a component anywhere in our component tree, but is technically injected
in a different place in the actual Dom tree. Its better for semantics and accessibility.
*/
class MyDocument extends Document {

    render() {
        return (
            <Html lang='en'>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <div id="notifications"></div>
                </body>
            </Html>
        )
    }
}

export default MyDocument;