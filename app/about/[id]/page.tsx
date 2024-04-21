export default function AboutId({ params }: { params: { id: string } }) {
    // function getRandomInt(count: number) {
    //     return Math.floor(Math.random() * count)
    // }
    // const random = getRandomInt(2);

    // if (random === 1) {
    //     throw new Error('Failed to loading about page')
    // }
    return (
        
        <h3> This is an about page no {params.id}</h3 >
    )
}   