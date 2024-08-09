import { PachinkoSelect } from ".";

export default {
    title: 'Select/PachinkoSelect',
    tags: ['autodocs'],
    render: (args) => {
        return (
            <div>
                <PachinkoSelect {...args} />
            </div>
        )
    }
}

export const Default = {
    args: {
        name: "selector",
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'maybe', label: 'Maybe' },
            { value: 'definitely', label: 'Definitely' },
        ]
    }
};

export const ExampleUsage = {
    args: {
        name: "selector",
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'Hell yeah' },
        ]
    },
    render: (args) => {
        return (
            <>
                <div>We use cookies to sell your data for mad $$$. Is it ok that we do it? 👉👈🥹</div>
                <PachinkoSelect {...args} />
            </>
        )
    }
}