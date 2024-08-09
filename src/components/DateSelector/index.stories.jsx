import { DateSelector } from ".";

export default {
    title: 'Select/DateSelector',
    tags: ['autodocs'],
    render: (args) => {
        return (
            <div>
                <DateSelector {...args} />
            </div>
        )
    }
}

export const Default = {
    args: {
        name: "selector",
    }
};
