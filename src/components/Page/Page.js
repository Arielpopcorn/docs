import React from "react";
import styled from "styled-components";
import { BreakPoint } from "@aragon/ui";
import renderReadme from "src/render-readme";
import MarkdownContent from "./MarkdownContent";
import Frame from "./Frame";
import Resizable from "./Resizable";

class Page extends React.Component {
  state = { loading: false, intro: "", doc: "" };
  async componentDidMount() {
    const { readme } = this.props;
    if (!readme) return;

    // Wait 150ms before displaying the loader
    const loadingDelay = setTimeout(() => {
      if (!this.props.intro) {
        this.setState({ loading: true });
      }
    }, 150);

    const { intro, doc } = await renderReadme(readme);

    clearTimeout(loadingDelay);
    this.setState({ intro, doc, loading: false });
  }
  render() {
    const { title, readme, children } = this.props;
    const { intro, doc, loading } = this.state;

    const content = (
      <div>
        <MarkdownContent content={intro} />
        {children}
        <MarkdownContent content={doc} />
      </div>
    );

    return (
      <StyledPage>
        <BreakPoint from="medium">
          <h1>{title}</h1>
        </BreakPoint>
        {loading && <p>Loading…</p>}
        {!readme || intro ? content : null}
      </StyledPage>
    );
  }
}

Page.Demo = ({ opaque, height, children }) => (
  <div>
    <h2>Demonstration</h2>
    <Resizable>
      <Frame opaque={opaque} height={height}>
        {children}
      </Frame>
    </Resizable>
  </div>
);

const StyledPage = styled.section`
  width: 100%;
  padding: 40px;
  color: #717171;
  code {
    font-family: "Source Code Pro", monospace;
  }
  > h1 {
    margin-bottom: 40px;
    font-weight: 600;
    color: #000;
    font-size: 35px;
  }
  h2,
  h3 {
    color: #000;
    font-weight: 600;
  }
  h2 {
    margin-top: 60px;
    margin-bottom: 30px;
    font-style: normal;
    font-weight: 300;
    line-height: 37px;
    font-size: 22px;
    color: #424770;
  }
  h3 {
    margin-top: 30px;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 15px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: #32325D;
  }
  p {
    margin-bottom: 30px;
    line-height: 2;
    font-style: normal;
    font-weight: normal;
    line-height: 25px;
    font-size: 15px;
    color: #424770;
  }
  .short {
    max-width: 600px;
  }
  .divider {
    width: 80%
    mix-blend-mode: normal;
    opacity: 0.32;
    border: 1.5px solid #979797;
    margin: 15px auto;
  }
`;

export default Page;
