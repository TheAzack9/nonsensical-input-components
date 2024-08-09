import { WeightedSlider } from ".";

export default {
    title: 'Sliders/WeightedSlider',
    tags: ['autodocs'],
    render: (args) => {
        return (
            <div>
                <WeightedSlider {...args} />
            </div>
        )
    }
}

export const Default = {
    args: {
        name: "slider",
        onChange: e => console.log(e.target.value)
    }
};
