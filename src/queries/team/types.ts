export type Team = {
    items: Array<{
        employees: Array<{
            value: {
                name: string,
                function: string,
                image: string,
                office_id: string,
                birthdate: Date,
                favorite_pet: string,
                favorite_food: string,
            }
            id: string,
        }>
    }>
};
