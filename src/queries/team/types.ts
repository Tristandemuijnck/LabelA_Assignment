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
            office: any
        }>
    }>
};

export type Office = {
    items: Array<{
        offices: Array<{
            value: {
                street: string,
                street_number: string,
                city: string,
            }
            id: string,
        }>
    }>
};
