import React from 'react';
import { Card } from 'antd';
// @ts-ignore
import ShowMoreText from 'react-show-more-text';


interface DisplayAppCardProps {
    entry: any;
}

class DisplayAppCard extends React.Component<DisplayAppCardProps> {

    render() {
        return (
            <Card title={this.props.entry['im:name']['label']} style={{ width: 400 }}>
                <ShowMoreText> {this.props.entry['summary']['label']}</ShowMoreText>
            </Card>
        );
    }
}

export default DisplayAppCard;