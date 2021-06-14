import React from 'react';
import DisplayAppCard from "./DisplayAppCard";
import { Input } from 'antd';
import styled from "styled-components";


const AppsContainer = styled.div `
  display: flex;
  justify-content: space-between;  
  width: 60%;
  flex-wrap: wrap;
  padding-top: 20px;
`;

interface ApplicationsProps {
    data: any;
}

interface ApplicationsState {
    entries: any[];
}

class Applications extends React.Component<ApplicationsProps, ApplicationsState> {
    constructor(props: ApplicationsProps) {
        super(props);
        this.state = {
            entries: props.data.entry
        };
    }
    handleSearch = (e: any) => {
        const {value} = e.target;
        this.setState({entries: this.props.data.entry.filter((e: { [x: string]: { [x: string]: string; }; }) => e['im:name']['label'].toLowerCase().includes(value.toLowerCase()))})
    }


    render() {
        const {entries} = this.state;
        return (
            <React.Fragment>
                <AppsContainer>
                    <div>
                <Input placeholder="Search" onChange={this.handleSearch} />
                    </div>
                <div>
                </div>
                </AppsContainer>
                <AppsContainer>
                {entries.map((e: any, i: any) => <DisplayAppCard entry={e}/>)}
                </AppsContainer>
            </React.Fragment>
        );
    }
}

export default Applications;