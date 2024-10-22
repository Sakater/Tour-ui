export type Location = {
    lat: number;
    lon: number;
    display_name: string
}

export type Result = {
    distances: [[
        {
            distance: number;
            originNode: Location;
            targetNode: Location;
            time: number;
        }
    ]],
    routes: [[]]
}
