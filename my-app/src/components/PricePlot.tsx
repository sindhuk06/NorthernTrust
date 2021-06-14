import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export interface Props {
    /**
     * data to plot Bar histograms
     */
    entries: any[];
    /**
     * name of the bar plot
     */
    title: string;
}

class PricePlot extends React.Component<Props, {}> {
    getOptions = (): Highcharts.Options | any => {
        const {props} = this;

        // @ts-ignore
        const prices = [... (new Set(props.entries.map(e => e['im:price']['label'])))];

        let counts: any = {};

        const arr = props.entries.map(e => e['im:price']['label']);


        for (let i = 0; i < arr.length; i++) {
            const num = arr[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }

        return {
            chart: {
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: props.title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [...prices].map(p => {
                    return {name: p, y: counts[p] * 100/arr.length}}
                )
            }]
        };
        
    };

    render() {
        return <HighchartsReact highcharts={Highcharts} options={this.getOptions()} />;
    }
}

export default PricePlot;
