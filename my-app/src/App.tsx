import React from 'react';
import './App.css';
import localforage from 'localforage';
import styled from 'styled-components';
import PricePlot from "./components/PricePlot";
import Applications from "./components/Applications";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

interface AppState {
    data: any;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { data: null}
    }
    async componentDidMount() {
        try {
            const res = await fetch("https://itunes.apple.com/us/rss/toppaidapplications/limit=100/json").then(res => res.json());
            await localforage.setItem('data', res.feed)
            this.setState({data: res.feed});
            console.log(res.feed.entry)
        } catch (err) {
            console.error(err);
        }

    }

    render() {
        const {data} = this.state;

        return (
            data ? (
            <Container>
                <PricePlot entries={data.entry} title={data.title.label}/>
                <Applications data={data} />
            </Container>) : <span>loading</span>

        );
    }
}

export default App;