import Input from "buildo-react-components/lib/Input";
import SingleDropdown from "buildo-react-components/lib/Dropdown";
import * as React from "react";

type State = {
    location : string,
    range: number
};

export default class SearchBar extends React.Component<{}, State> {

    private rangeOptions: {value: number, label: string}[] = [
        { value: 500, label: "500 m" },
        { value: 1000, label: "1 km" },
        { value: 2000, label: "2 km" },
        { value: 3000, label: "3 km" },
        { value: 4000, label: "4 km" },
        { value: 5000, label: "5 km" },
        { value: 6000, label: "6 km" },
        { value: 7000, label: "7 km" },
        { value: 8000, label: "8 km" },
        { value: 9000, label: "9 km" },
        { value: 10000, label: "10 km" }
    ];

    onTypeLocation = (text: string) => this.setState({ location: text });
    onChangeRange = (distance: number) => this.setState({ range: distance }); 

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            location: "",
            range: 0
        }
    }

    render() {
        return (
            <div>
                <form className="location-form">
                    <Input
                        placeholder="Insert location'"
                        value={this.state.location}
                        onChange={this.onTypeLocation}
                    />
                </form>
                <SingleDropdown
                    className="range-form"
                    value={this.state.range}
                    onChange={this.onChangeRange}
                    placeholder="-"
                    options={this.rangeOptions}
                />
            </div>
        );
    }

}




