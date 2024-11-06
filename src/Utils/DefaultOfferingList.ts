import { BusinessOffering } from "../Types/allTypes";

export const ConvienceStore: BusinessOffering[] = [
    {
        type: "product",
        name: "Milk",
        description: "Whole Milk",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "product",
        name: "Eggs",
        description: "Dozen Eggs",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "product",
        name: "Bread",
        description: "Whole Wheat Bread",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "product",
        name: "Cigarettes",
        description: "Marlboro Red",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "product",
        name: "Beer",
        description: "12 Pack of Bud Light",
        price: {
            currency: '',
            value: ''
        }
    }
];

export const GasStation: BusinessOffering[] = [
    {
        type: "product",
        name: "Unleaded Gas",
        description: "Regular Unleaded Gas",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "product",
        name: "Diesel",
        description: "Diesel Gas",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "product",
        name: "Cigarettes",
        description: "Marlboro Red",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "product",
        name: "Beer",
        description: "12 Pack of Bud Light",
        price: {
            currency: '',
            value: ''
        }
    }
];

const Realtor: BusinessOffering[] = [
    {
        type: "service",
        name: "Home Buying",
        description: "Home Buying service",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "service",
        name: "Home Selling",
        description: "Home Selling service",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "service",
        name: "Home Staging",
        description: "Home Staging service",
        price: {
            currency: '',
            value: ''
        }
    },
    {
        type: "service",
        name: "Home Appraisal",
        description: "Home Appraisal service",
        price: {
            currency: '',
            value: ''
        }
    }
];

export const defaultOfferingList = [
    {_id: "ConvienceStore", name: "Convience Store", offerings: ConvienceStore},
    {_id: "GasStation", name: "Gas Station", offerings: GasStation},
    {_id: "Realtor", name: "Realtor", offerings: Realtor}
];