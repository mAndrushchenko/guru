// @ts-ignore
import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom';

const Report = ({ renderHeader, renderBody, renderFooter }) => {
  return (
    <div>
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
    </div>
  );
};

const HTMLReport = () => {
  const renderHeader = () => <header><h1>HTML Report</h1></header>;
  const renderBody = () => <main><p>This is the body of the HTML report.</p></main>;
  const renderFooter = () => <footer><p>HTML Report Footer</p></footer>;

  return <Report renderHeader={renderHeader} renderBody={renderBody} renderFooter={renderFooter} />;
};

const PlainTextReport = () => {
  const renderHeader = () => <header><h1>Plain Text Report</h1></header>;
  const renderBody = () => <main><p>This is the body of the Plain Text report.</p></main>;
  const renderFooter = () => <footer><p>Plain Text Report Footer</p></footer>;

  return <Report renderHeader={renderHeader} renderBody={renderBody} renderFooter={renderFooter} />;
};

function App() {
  return (
    <div>
      <HTMLReport />
      <PlainTextReport />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))
