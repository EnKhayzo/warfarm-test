// can be 'test' or 'prod'
export const env = "test";

export const namesMap = {
    "test": {
        "userData": "userData_warfarm_test",
        "basePath": "/warfarm-test",
        "titleName": "Warfarm TEST"
    },
    "prod": {
        "userData": "userData",
        "basePath": "/warfarm",
        "titleName": "Warfarm"
    }
};

export const names = namesMap[env];
